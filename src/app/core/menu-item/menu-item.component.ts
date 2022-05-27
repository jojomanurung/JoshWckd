import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MenuItem } from '@shared/interface/menu-items/menu-items';
import { NavService } from '@service/nav/nav.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(-180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
    trigger('showChild', [
      transition(':enter', [
        style({ transform: 'translateY(-5px)', opacity: 0 }),
        animate(
          '225ms cubic-bezier(0.4,0.0,0.2,1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '225ms cubic-bezier(0.4,0.0,0.2,1)',
          style({ transform: 'translateY(-5px)', opacity: 0 })
        ),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-5px)', opacity: 0 }),
        animate(
          '225ms cubic-bezier(0.4,0.0,0.2,1)',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '225ms cubic-bezier(0.4,0.0,0.2,1)',
          style({ transform: 'translateX(-5px)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class MenuItemComponent implements OnInit, OnDestroy {
  expanded = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: MenuItem;
  @Input() isMobile!: boolean;
  @Input() depth!: number;
  @Input() isNavCollapsed!: boolean;
  private subs = new SubSink();

  constructor(public navService: NavService, public router: Router) {}

  ngOnInit() {
    if (this.depth === undefined) {
      this.depth = 0;
    }
    this.observeCurrentUrl();
  }

  observeCurrentUrl() {
    this.subs.sink = this.navService.currentUrl.subscribe((url: string) => {
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
  menuItems(element: MenuItem[], url: string) {
    element.forEach((child: MenuItem) => {
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


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
