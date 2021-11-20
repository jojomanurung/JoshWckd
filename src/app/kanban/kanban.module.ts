import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './page/kanban.component';
import { TaskComponent } from './components/task/task.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [KanbanComponent, TaskComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    KanbanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class KanbanModule {}
