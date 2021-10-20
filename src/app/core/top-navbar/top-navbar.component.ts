import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from 'src/app/service/nav/nav.service';
import { SubSink } from 'subsink';
import { MenuItem } from '../interface/nav-item/nav-item';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  public pageTitle:string = '';
  private subs = new SubSink();
  menuItems = MenuItem;

  constructor(public navService: NavService) { }


  ngOnInit(): void {
    this.currentPageTitle();
  }

  currentPageTitle() {
    this.subs.sink = this.navService.currentUrl.subscribe((url: string) => {
      if (url) {
        const found = this.menuItems.find((menu) => menu.route === url.replace('/', ''));
        if (found) {
          this.pageTitle = found.title;
        } else {
          this.pageTitle = '';
          this.pageTitleService();
        }
      }
    })
  }

  pageTitleService() {
    this.subs.sink = this.navService.pageTitle.subscribe((val) => {
      console.log(val);
      if (val) {
        this.pageTitle = val;
      } else {
        return;
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
