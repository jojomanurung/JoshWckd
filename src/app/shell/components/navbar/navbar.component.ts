import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavService } from '@service/nav/nav.service';
import { MenuItems } from '@shared/interface/menu-items/menu-items';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('blockInitRenderAnimation', [transition(':enter', [])]),
    trigger('showChild', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate(
          '225ms cubic-bezier(0.4,0.0,0.2,1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '225ms cubic-bezier(0.4,0.0,0.2,1)',
          style({ transform: 'translateY(-10px)', opacity: 0 })
        ),
      ]),
    ]),
    trigger('fadeInOut', [
      state('enter', style({ transform: 'translateX(0)', opacity: 1, display: 'flex' })),
      state('leave', style({ transform: 'translateX(-5px)', opacity: 0, display: 'none' })),
      transition(
        'enter <=> leave',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() isMobile!: boolean;
  private subs = new SubSink();
  menuItems = MenuItems;
  logo = '../../assets/images/logo.png';
  version = environment.appVersion;
  expanded = true;
  isNavCollapsed = false;

  constructor(public navService: NavService) {}

  ngOnInit(): void {
    this.listenNavBar();
  }

  listenNavBar() {
    this.subs.sink = this.navService.appDrawer.subscribe((isCollapsed) => {
      this.isNavCollapsed = isCollapsed;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
