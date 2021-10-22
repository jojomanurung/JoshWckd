import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from './core/interface/nav-item/nav-item';
import { NavService } from './service/nav/nav.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild('appDrawer') appDrawer!: ElementRef;
	navItems = MenuItem;

	constructor(private navService: NavService) {}

	ngAfterViewInit() {
		this.navService.appDrawer = this.appDrawer;
	}
}
