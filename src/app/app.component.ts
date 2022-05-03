import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NavService } from './service/nav/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private layoutObserver: BreakpointObserver,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    this.breakPointObserver();
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
}
