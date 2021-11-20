import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard-card-item',
	templateUrl: './dashboard-card-item.component.html',
	styleUrls: ['./dashboard-card-item.component.scss'],
})
export class DashboardCardItemComponent implements OnInit {
  image = 'src/assets/kanban.PNG';
	constructor() {}

	ngOnInit(): void {}
}
