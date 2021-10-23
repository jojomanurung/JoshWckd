import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { filter, tap } from 'rxjs/operators';
import { MenuItem } from './core/interface/nav-item/nav-item';
import { NavService } from './service/nav/nav.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild('appDrawer') appDrawer!: ElementRef;
	@ViewChild(NgScrollbar) scrollRef!: NgScrollbar;
	navItems = MenuItem;

	constructor(private navService: NavService, private router: Router) {
		this.router.events
			.pipe(
				filter((e): e is NavigationEnd => e instanceof NavigationEnd),
				filter(() => !!this.scrollRef),
				tap((e: NavigationEnd) => this.scrollRef.scrollTo({ top: 0 }))
			)
			.subscribe();
	}

	ngAfterViewInit() {
		this.navService.appDrawer = this.appDrawer;
	}
}
