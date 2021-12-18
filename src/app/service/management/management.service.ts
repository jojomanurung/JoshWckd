import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/shared/interface/project-item/project-item';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  managementCollection = this.store.collection('management');

  constructor(private store: AngularFirestore) {}

  getProject(): Observable<Project[]> {
    return this.managementCollection.snapshotChanges().pipe(
      map((action) =>
        action.map((a) => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  saveProject(payload: Project) {
    this.managementCollection.add(payload);
  }

  editProject(payload: Project) {
    this.managementCollection.doc(payload.id).update(payload);
  }

  deleteProject(payload: Project) {
    this.managementCollection.doc(payload.id).delete();
  }
}
