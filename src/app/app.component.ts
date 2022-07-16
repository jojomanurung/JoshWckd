import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NavService } from '@service/nav/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private layoutObserver: BreakpointObserver,
    private navService: NavService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.getCurrentUrl();
    this.breakPointObserver();
  }

  getCurrentUrl() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.navService.setCurrentUrl(event.urlAfterRedirects);
      }
    });
  }

  breakPointObserver() {
    const Layout = this.navService.Layout;
    this.layoutObserver
      .observe([Layout.MobilePortrait, Layout.MobileLandscape])
      .subscribe((result) => {
        this.navService.setIsMobile(result.matches);
      });
  }
}
