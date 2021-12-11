import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { filter, tap } from 'rxjs/operators';
import { MenuItem } from 'src/app/shared/interface/nav-item/nav-item';
import { NavService } from 'src/app/service/nav/nav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit {
  @ViewChild(MatSidenav) appDrawer!: MatSidenav;
  @ViewChild(NgScrollbar) scrollRef!: NgScrollbar;
  navItems = MenuItem;
  isMobile!: boolean;
  logo = '../../assets/images/logo.png';
  version = environment.appVersion;

  constructor(public navService: NavService, private router: Router) {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        filter(() => !!this.scrollRef),
        tap((e: NavigationEnd) => this.scrollRef.scrollTo({ top: 0 }))
      )
      .subscribe();

    this.navService.isMobile.subscribe((e: boolean) => (this.isMobile = e));
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}