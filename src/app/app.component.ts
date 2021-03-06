import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NavService } from '@service/nav/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private layoutObserver: BreakpointObserver,
    private navService: NavService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.getCurrentUrl();
    this.breakPointObserver();
    this.loadStyle();
  }

  getCurrentUrl() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.navService.setCurrentUrl(event.urlAfterRedirects);
        console.log(event.urlAfterRedirects)
      }
    });
  }

  breakPointObserver() {
    const Layout = this.navService.Layout;
    this.layoutObserver
      .observe([Layout.MobilePortrait, Layout.MobileLandscape])
      .subscribe((result) => {
        this.navService.setIsMobile(result.matches);
      });
  }

  loadStyle() {
    this.navService.theme.subscribe((styleName) => {
      console.log(styleName);
      let theme: string;
      if (!styleName) {
        localStorage.setItem('theme', 'one-dark');
        theme = 'one-dark';
      } else {
        theme = styleName;
      }

      const head = this.document.getElementsByTagName('head')[0];

      let themeLink = this.document.getElementById(
        'themeAsset'
      ) as HTMLLinkElement;
      if (themeLink) {
        themeLink.href = `${theme}.css`;
      } else {
        const style = this.document.createElement('link');
        style.id = 'themeAsset';
        style.rel = 'stylesheet';
        style.href = `${theme}.css`;

        head.appendChild(style);
      }
    })
  }
}
