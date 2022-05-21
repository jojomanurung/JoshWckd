import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '@shared/interface/nav-item/nav-item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isMobile!: boolean;
  menuItems = MenuItem;
  logo = '../../assets/images/logo.png';
  version = environment.appVersion;

  constructor() { }

  ngOnInit(): void {
  }

}
