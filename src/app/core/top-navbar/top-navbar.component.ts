import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from 'src/app/service/nav/nav.service';
import { SubSink } from 'subsink';
import { MenuItem } from 'src/app/shared/interface/nav-item/nav-item';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  public pageTitle = '';
  private subs = new SubSink();
  menuItems = MenuItem;

  constructor(public navService: NavService) {}

  ngOnInit(): void {
    this.pageTitleService();
  }

  currentPageTitle() {
    this.subs.sink = this.navService.currentUrl.subscribe((url: string) => {
      if (url) {
        let childs: any;
        const found = this.menuItems.find((menu) => {
          if (!menu.children) {
            return menu.route === url.replace('/', '');
          } else {
            const child = menu.children.find((child) => {
              return child.route === url.replace('/', '');
            });
            childs = child;
            return child;
          }
        });
        if (found && found.children) {
          this.pageTitle = childs.title;
        } else if (found && !found.children) {
          this.pageTitle = found.title;
        } else {
          this.pageTitle = '';
        }
      }
    });
  }

  pageTitleService() {
    this.subs.sink = this.navService.pageTitle.subscribe((val) => {
      if (val) {
        this.pageTitle = val;
      } else {
        this.currentPageTitle();
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
