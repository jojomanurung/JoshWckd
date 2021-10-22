export interface Task {
	id?: string;
	title: string;
	description: string;
}

export interface TaskDialogData {
	task: Partial<Task>;
	enableDelete: boolean;
	edit?: boolean;
}

export interface TaskDialogResult {
	task: Task;
	delete?: boolean;
}
