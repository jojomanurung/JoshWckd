import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-dashboard-card-item',
  templateUrl: './dashboard-card-item.component.html',
  styleUrls: ['./dashboard-card-item.component.scss'],
})
export class DashboardCardItemComponent {
  @Input() project: any;

  constructor() {}

}
