import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './page/dashboard-main.component';
import { DashboardCardItemComponent } from './components/dashboard-card-item/dashboard-card-item.component';
import { DashboardProfileCardComponent } from './components/dashboard-profile-card/dashboard-profile-card.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    DashboardCardItemComponent,
    DashboardProfileCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class DashboardModule { }
