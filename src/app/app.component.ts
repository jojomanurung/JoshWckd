import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
    this.breakPointObserver();
    this.loadStyle('one-dark');
  }

  breakPointObserver() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.navService.setCurrentUrl(event.urlAfterRedirects);
      }
    });
    this.layoutObserver
      .observe([
        Breakpoints.HandsetPortrait
      ])
      .subscribe((result) => {
        this.navService.setIsMobile(result.matches);
      });
  }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'themeAsset'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${styleName}.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'themeAsset';
      style.rel = 'stylesheet';
      style.href = `${styleName}.css`;

      head.appendChild(style);
    }
  }
}
