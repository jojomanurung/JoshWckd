import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
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
		KanbanRoutingModule,
		MatCardModule,
		DragDropModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatDialogModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
	],
})
export class KanbanModule {}
