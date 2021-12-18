import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './page/management.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { AddProjectComponent } from './components/add-project/add-project.component';

@NgModule({
  declarations: [
    ManagementComponent,
    ProjectTableComponent,
    AddProjectComponent,
  ],
  imports: [CommonModule, SharedModule, ManagementRoutingModule],
})
export class ManagementModule {}
