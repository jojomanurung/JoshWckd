import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import { MenuItem } from '@shared/interface/nav-item/nav-item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('showChild', [
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '225ms cubic-bezier(0.4,0.0,0.2,1)',
          style({ transform: 'translateY(-10px)', opacity: 0 })
        ),
      ]),
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate(
          '225ms cubic-bezier(0.4,0.0,0.2,1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class NavbarComponent implements AfterViewInit {
  @HostBinding('@showChild') animate = false;
  @Input() isMobile!: boolean;
  menuItems = MenuItem;
  logo = '../../assets/images/logo.png';
  version = environment.appVersion;
  expanded = true;

  constructor() {}

  ngAfterViewInit(): void {
    this.animate = true;
  }
}
