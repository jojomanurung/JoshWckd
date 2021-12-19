import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-card-item',
  templateUrl: './dashboard-card-item.component.html',
  styleUrls: ['./dashboard-card-item.component.scss'],
})
export class DashboardCardItemComponent implements OnInit {
  @Input() project: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openProject(link: any) {
    if (link.includes('/')) {
      link = link.replace('/', '');
    }
    this.router.navigate([link]);
  }
}
