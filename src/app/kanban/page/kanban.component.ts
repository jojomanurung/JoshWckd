import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
	Task,
	TaskDialogResult,
} from 'src/app/core/interface/task-item/task-item';
import { KanbanService } from 'src/app/service/kanban/kanban.service';
import { NavService } from 'src/app/service/nav/nav.service';
import { SubSink } from 'subsink';
import { TaskDialogComponent } from '../components/task-dialog/task-dialog.component';

@Component({
	selector: 'app-kanban',
	templateUrl: './kanban.component.html',
	styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy {
	todo: Task[] = [];
	inProgress: Task[] = [];
	done: Task[] = [];

	private subs = new SubSink();

	constructor(
		private navService: NavService,
		private dialog: MatDialog,
		private kanbanService: KanbanService
	) {
		this.navService.setPageTitle('Kanban');
	}

	ngOnInit(): void {
		this.getKanbanData();
	}

	getKanbanData() {
		this.subs.sink = this.kanbanService.getTodo().subscribe((resp) => {
			if (!resp) {
				return;
			}
			console.log('todo', resp);
			this.todo = resp;
		});
		this.subs.sink = this.kanbanService.getInProgress().subscribe((resp) => {
			if (!resp) {
				return;
			}
			console.log('inProgress', resp);
			this.inProgress = resp;
		});
		this.subs.sink = this.kanbanService.getDone().subscribe((resp) => {
			if (!resp) {
				return;
			}
			console.log('done', resp);
			this.done = resp;
		});
	}

	editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
		const dialogRef = this.dialog.open(TaskDialogComponent, {
			width: '270px',
			data: {
				task,
				enableDelete: true,
			},
		});
		dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
			if (!result) {
				return;
			}
			if (result.delete) {
				this.kanbanService.deleteItem(list, task);
			} else {
				this.kanbanService.updateItem(list, task);
			}
		});
	}

	drop(event: CdkDragDrop<Task[]>): void {
		if (event.previousContainer === event.container) {
			return;
		}
		if (!event.container.data || !event.previousContainer.data) {
			return;
		}
		const item = event.previousContainer.data[event.previousIndex];
		this.kanbanService.dropItem(event.previousContainer, event.container, item);
		transferArrayItem(
			event.previousContainer.data,
			event.container.data,
			event.previousIndex,
			event.currentIndex
		);
	}

	newTask(): void {
		const dialogRef = this.dialog.open(TaskDialogComponent, {
			width: '270px',
			data: {
				task: {},
			},
		});
		dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
			if (!result) {
				return;
			}
			this.kanbanService.createItem(result.task);
		});
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
