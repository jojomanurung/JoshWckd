import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { BehaviorSubject } from 'rxjs';
import { MenuItems } from '@shared/interface/menu-items/menu-items';
import { NavService } from '@service/nav/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ]
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() isMobile!: boolean;
  public pageTitle = new BehaviorSubject<string>('');
  private subs = new SubSink();
  menuItems = MenuItems;
  isNavCollapsed = false;

  constructor(public navService: NavService) {}

  ngOnInit(): void {
    this.pageTitleService();
    this.currentPageTitle();

    this.subs.sink = this.navService.appDrawer.subscribe((isCollapsed) => {
      this.isNavCollapsed = isCollapsed;
    });
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
