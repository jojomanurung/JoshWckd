import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './page/project-management.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { AddProjectComponent } from './components/add-project/add-project.component';

@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProjectTableComponent,
    AddProjectComponent,
  ],
  imports: [CommonModule, SharedModule, ProjectManagementRoutingModule],
})
export class ProjectManagementModule {}
