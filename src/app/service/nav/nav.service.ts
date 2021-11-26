import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavService {
  public appDrawer: any;

  private currentUrlSubject = new BehaviorSubject<string>('');
  public currentUrl = this.currentUrlSubject.asObservable();

  private pageTitleSubject = new BehaviorSubject<string>('');
  public pageTitle = this.pageTitleSubject.asObservable();

  private isMobileSubject = new BehaviorSubject<boolean>(false);
  public isMobile = this.isMobileSubject.asObservable();

  constructor(
    private router: Router,
    private layoutObserver: BreakpointObserver
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrlSubject.next(event.urlAfterRedirects);
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
        this.isMobileSubject.next(result.matches);
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
      this.pageTitleSubject.next(value);
    }
  }
}
