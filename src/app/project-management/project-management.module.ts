import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './page/project-management.component';

@NgModule({
  declarations: [ProjectManagementComponent],
  imports: [CommonModule, SharedModule, ProjectManagementRoutingModule],
})
export class ProjectManagementModule {}
