import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
	Task,
	TaskDialogData,
} from 'src/app/core/interface/task-item/task-item';

@Component({
	templateUrl: './task-dialog.component.html',
	styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
	private backupTask: Partial<Task> = { ...this.data.task };

	constructor(
		public dialogRef: MatDialogRef<TaskDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: TaskDialogData
	) {}

	ngOnInit(): void {}

	cancel(): void {
		this.data.task.title = this.backupTask.title;
		this.data.task.description = this.backupTask.description;
		this.dialogRef.close(this.data);
	}
}
