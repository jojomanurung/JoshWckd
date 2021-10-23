import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Task } from 'src/app/core/interface/task-item/task-item';

@Injectable({
	providedIn: 'root',
})
export class KanbanService {
	kanbanCollection = this.store.doc('project/kanban');

	constructor(private store: AngularFirestore) {}

	getTodo(): Observable<Task[]> {
		return this.kanbanCollection
			.collection('todo')
			.snapshotChanges()
			.pipe(
				map((action) =>
					action.map((a) => {
						const data = a.payload.doc.data() as Task;
						const id = a.payload.doc.id;
						return { id, ...data };
					})
				)
			);
	}

	getInProgress(): Observable<Task[]> {
		return this.kanbanCollection
			.collection('inProgress')
			.snapshotChanges()
			.pipe(
				map((action) =>
					action.map((a) => {
						const data = a.payload.doc.data() as Task;
						const id = a.payload.doc.id;
						return { id, ...data };
					})
				)
			);
	}

	getDone(): Observable<Task[]> {
		return this.kanbanCollection
			.collection('done')
			.snapshotChanges()
			.pipe(
				map((action) =>
					action.map((a) => {
						const data = a.payload.doc.data() as Task;
						const id = a.payload.doc.id;
						return { id, ...data };
					})
				)
			);
	}

	dropItem(previousContainer: any, currentContainer: any, item: any) {
		this.store.firestore.runTransaction(() => {
			const promise = Promise.all([
				this.kanbanCollection
					.collection(previousContainer.id)
					.doc(item.id)
					.delete(),
				this.kanbanCollection
					.collection(currentContainer.id)
					.doc(item.id)
					.set(item),
			]);
			return promise;
		});
	}

	deleteItem(list: any, task: any) {
		this.kanbanCollection.collection(list).doc(task.id).delete();
	}

	updateItem(list: any, task: any) {
		this.kanbanCollection.collection(list).doc(task.id).update(task);
	}

	createItem(task: any) {
		this.kanbanCollection.collection('todo').add(task);
	}
}
