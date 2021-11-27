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
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: NavItem;
  @Input() depth!: number;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      } else if (this.item.children && this.item.children.length) {
        this.item.children.forEach((child) => {
          // console.log(`Checking '/${child.route}' against '${url}'`);
          this.expanded = url.indexOf(`/${child.route}`) === 0;
          this.ariaExpanded = this.expanded;
          // console.log(`${child.route} is expanded: ${this.expanded}`);
        });
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (item.route && item.children && item.children.length) {
      this.router.navigate([item.route ? item.route : '']);
      this.navService.isMobile.subscribe((isMobile) => {
        if (isMobile) {
          this.navService.closeNav();
        }
      });
      if (this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    }
    if (item.route && (!item.children || !item.children.length)) {
      this.router.navigate([item.route ? item.route : '']);
      this.navService.isMobile.subscribe((isMobile) => {
        if (isMobile) {
          this.navService.closeNav();
        }
      });
    }
    if (!item.route && item.children && item.children.length) {
      if (this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
    }
  }
}
