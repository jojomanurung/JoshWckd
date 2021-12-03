import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from 'src/app/service/nav/nav.service';
import { SubSink } from 'subsink';
import { MenuItem } from 'src/app/shared/interface/nav-item/nav-item';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  public pageTitle = new BehaviorSubject<string>('');
  private subs = new SubSink();
  menuItems = MenuItem;

  constructor(public navService: NavService) {}

  ngOnInit(): void {
    this.pageTitleService();
    this.currentPageTitle();
  }

  pageTitleService() {
    this.subs.sink = this.navService.pageTitle.subscribe((val) => {
      if (val) {
        this.pageTitle.next(val);
      }
    });
  }

  currentPageTitle() {
    this.subs.sink = this.navService.currentUrl.subscribe((url: string) => {
      if (url) {
        this.menuItems.forEach((menu) => {
          if (menu.title && url.indexOf(`/${menu.route}`) === 0) {
            this.pageTitle.next(menu.title);
          } else {
            if (menu.children && menu.children.length) {
              this.menuTitle(menu.children, url);
            }
          }
        });
      }
    });
  }

  // ******* Recursive method to check the child of menu items until route match with url ******* //
  menuTitle(element: any, url: string) {
    element.forEach((child: any) => {
      if (child.title && url.indexOf(`/${child.route}`) === 0) {
        this.pageTitle.next(child.title);
      } else {
        if (child.children && child.children.length) {
          this.menuTitle(child.children, url);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
