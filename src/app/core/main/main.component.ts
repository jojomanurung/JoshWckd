import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { filter, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { MenuItem } from '@shared/interface/nav-item/nav-item';
import { NavService } from '@service/nav/nav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav) appDrawer!: MatSidenav;
  @ViewChild(NgScrollbar) scrollRef!: NgScrollbar;
  navItems = MenuItem;
  isMobile!: boolean;
  logo = '../../assets/images/logo.png';
  version = environment.appVersion;
  private subs = new SubSink();

  constructor(public navService: NavService, private router: Router) {}

  ngOnInit(): void {
    this.subs.sink = this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        filter(() => !!this.scrollRef),
        tap((e: NavigationEnd) => this.scrollRef.scrollTo({ top: 0 }))
      )
      .subscribe();

    this.subs.sink = this.navService.isMobile.subscribe(
      (e: boolean) => (this.isMobile = e)
    );
  }

  ngAfterViewInit(): void {
    this.navService.appDrawer = this.appDrawer;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
