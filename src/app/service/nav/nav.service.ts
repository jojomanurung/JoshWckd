import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>('');
  public pageTitle = new BehaviorSubject<string>('');
  public isMobile = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private layoutObserver: BreakpointObserver
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
    this.layoutObserver
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
      ])
      .subscribe((result) => {
        this.isMobile.next(result.matches);
      });
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public toggleNav() {
    this.appDrawer.toggle();
  }

  setPageTitle(value: string) {
    if (value) {
      this.pageTitle.next(value);
    }
  }
}
