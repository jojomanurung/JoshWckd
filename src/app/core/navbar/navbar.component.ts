import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MenuItems } from '@shared/interface/menu-items/menu-items';
import { environment } from 'src/environments/environment';

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
  ],
})
export class NavbarComponent {
  @Input() isMobile!: boolean;
  menuItems = MenuItems;
  logo = '../../assets/images/logo.png';
  version = environment.appVersion;
  expanded = true;

  constructor() {}
}
