import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/interface/task-item/task-item';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;

  constructor(private store: AngularFirestore) { }

  dropItem(previousContainer: any, currentContainer: any, item: any) {
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(previousContainer.id).doc(item.id).delete(),
        this.store.collection(currentContainer.id).add(item),
      ]);
      return promise;
    });
  }

  deleteItem(list: any, task: any) {
    this.store.collection(list).doc(task.id).delete();
  }

  updateItem(list: any, task: any) {
    this.store.collection(list).doc(task.id).update(task);
  }

  createItem(task: any) {
    this.store.collection('todo').add(task);
  }

}
