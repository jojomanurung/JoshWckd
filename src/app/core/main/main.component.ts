import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { filter, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { NavService } from '@service/nav/nav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild(NgScrollbar) scrollRef!: NgScrollbar;
  isMobile!: boolean;
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
