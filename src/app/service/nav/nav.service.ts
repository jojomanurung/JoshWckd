import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public Layout = {
    MobilePortrait: '(max-width: 599.98px) and (orientation: portrait)',
    MobileLandscape: '(max-width: 915px) and (orientation: landscape)',
  };

  private appDrawerSubject = new BehaviorSubject<boolean>(true);
  public appDrawer = this.appDrawerSubject.asObservable();

  private currentUrlSubject = new BehaviorSubject<string>('');
  public currentUrl = this.currentUrlSubject.asObservable();

  private pageTitleSubject = new BehaviorSubject<string>('');
  public pageTitle = this.pageTitleSubject.asObservable();

  private isMobileSubject = new BehaviorSubject<boolean>(false);
  public isMobile = this.isMobileSubject.asObservable();

  private themeSubject = new BehaviorSubject<string>(this.currTheme);
  public theme = this.themeSubject.asObservable();
  constructor() {}

  closeNav() {
    this.appDrawerSubject.next(true);
  }

  openNav() {
    this.appDrawerSubject.next(false);
  }

  toggleNav() {
    const status = this.appDrawerSubject.getValue();
    this.appDrawerSubject.next(!status);
  }

  setCurrentUrl(url: string) {
    this.currentUrlSubject.next(url);
  }

  setIsMobile(value: boolean) {
    this.isMobileSubject.next(value);
  }

  setPageTitle(value: string) {
    if (value) {
      this.pageTitleSubject.next(value);
    }
  }

  set currTheme(value: string) {
    localStorage.setItem('theme', value);
    this.themeSubject.next(value);
  }

  get currTheme() {
    return localStorage.getItem('theme') as string;
  }
}
