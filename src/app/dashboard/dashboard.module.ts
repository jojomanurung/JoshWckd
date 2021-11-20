import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './page/dashboard-main.component';
import { DashboardCardItemComponent } from './components/dashboard-card-item/dashboard-card-item.component';
import { DashboardProfileCardComponent } from './components/dashboard-profile-card/dashboard-profile-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardMainComponent,
    DashboardCardItemComponent,
    DashboardProfileCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
