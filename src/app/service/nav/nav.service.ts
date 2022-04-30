import { Injectable } from '@angular/core';
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

  constructor() {}

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public toggleNav() {
    this.appDrawer.toggle();
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
}
