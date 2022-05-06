import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Task } from 'src/app/shared/models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: Observable<Task[]> | any;

  private tasksCollection: AngularFirestoreCollection<Task>

  constructor(private readonly afs:AngularFirestore) {
    this.tasksCollection = afs.collection<Task>('tasks');
    this.getTasks();
  }

  onDeleteTask(taskId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.tasksCollection.doc(taskId).delete();
        resolve(result);
      } catch (error:any) {
        reject(error.message);
      }
    });
  }

  onSaveTask(task: Task, taskId: string): Promise<void> {
    return new Promise(async (resolve, rejected) => {
      try {
        const id = taskId || this.afs.createId();
        const data = { id, ...task };
        const result = this.tasksCollection.doc(id).set(data);
        resolve(result);
      } catch (error: any) {
        rejected(error.message);
      }
    });
  }

  private getTasks(): void {this.tasks = this.tasksCollection.snapshotChanges().pipe(
        map((actions) => actions.map((a: any) => a.payload.doc.data() as Task)));
  }

}
