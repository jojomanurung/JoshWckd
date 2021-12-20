import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavItem } from 'src/app/shared/interface/nav-item/nav-item';
import { NavService } from 'src/app/service/nav/nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class MenuListItemComponent implements OnInit {
  expanded = false;
  isMobile = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: NavItem;
  @Input() depth!: number;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }

    this.navService.isMobile.subscribe(
      (isMobile) => (this.isMobile = isMobile)
    );
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url && url.indexOf(`/${this.item.route}`) === 0) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      } else {
        if (this.item.children && this.item.children.length) {
          this.menuItems(this.item.children, url);
        }
      }
    });
  }

  // ******* Recursive method to check the child of menu items until route match with url ******* //
  menuItems(element: NavItem[], url: string) {
    element.forEach((child: NavItem) => {
      if (child.route && url && url.indexOf(`/${child.route}`) === 0) {
        this.expanded = url.indexOf(`/${child.route}`) === 0;
        this.ariaExpanded = this.expanded;
      } else {
        if (child.children && child.children.length) {
          this.menuItems(child.children, url);
        }
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (item.route && item.children && item.children.length) {
      this.router.navigate([item.route ? item.route : '']);
      if (this.isMobile) {
        this.navService.closeNav();
      }
      this.expanded = !this.expanded;
    }
    if (item.route && (!item.children || !item.children.length)) {
      this.router.navigate([item.route ? item.route : '']);
      if (this.isMobile) {
        this.navService.closeNav();
      }
    }
    if (!item.route && item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
