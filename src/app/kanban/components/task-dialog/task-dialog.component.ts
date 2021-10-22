import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
	Task,
	TaskDialogData,
	TaskDialogResult,
} from 'src/app/core/interface/task-item/task-item';
import { KanbanService } from 'src/app/service/kanban/kanban.service';

@Component({
	templateUrl: './task-dialog.component.html',
	styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
	form!: FormGroup;
	initialForm: any;

	constructor(
		public dialogRef: MatDialogRef<TaskDialogComponent>,
		private fb: FormBuilder,
		private kanbanService: KanbanService,
		@Inject(MAT_DIALOG_DATA) public data: TaskDialogData
	) {}

	ngOnInit(): void {
		this.initForm();
		if (this.data.edit) {
			this.patchData();
		}
	}

	initForm() {
		this.form = this.fb.group({
			id: [null],
			title: [null, Validators.required],
			description: [null, Validators.required],
		});
		this.initialForm = this.form.getRawValue();
	}

	patchData() {
		this.form.patchValue(this.data.task);
		this.initialForm = this.form.getRawValue();
	}

	checkFormChanged() {
		const currentForm = JSON.stringify(this.form.getRawValue());
		const initialForm = JSON.stringify(this.initialForm);

		return currentForm === initialForm ? true : false;
	}

	submit() {
		this.data.edit ? this.updateTask() : this.createTask();
	}

	createTask() {
		const payload = this.form.getRawValue();
		delete payload.id;
		this.kanbanService.createItem(payload);
		this.dialogRef.close();
	}

	updateTask() {
		const payload: TaskDialogResult = {
			task: this.form.getRawValue(),
		};
		this.dialogRef.close(payload);
	}

	cancel(): void {
		this.dialogRef.close();
	}
}
