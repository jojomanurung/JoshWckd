import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { TaskDialogComponent } from '../components/task-dialog/task-dialog.component';
import { LoadingService } from '@service/loading/loading.service';
import { Task, TaskDialogResult } from '@shared/interface/task-item/task-item';
import { KanbanService } from '@service/kanban/kanban.service';
import * as _ from 'lodash-es';

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
    private dialog: MatDialog,
    private kanbanService: KanbanService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getKanbanData();
  }

  getKanbanData() {
    this.loadingService.loadingOn();
    this.subs.sink = this.kanbanService.getTodo().subscribe(
      (resp) => {
        if (!resp.length) {
          this.todo = [];
          this.loadingService.loadingOff();
          return;
        } else {
          console.log('todo', resp);
          this.todo = _.cloneDeep(resp);
          this.loadingService.loadingOff();
        }
      },
      (err) => {
        this.loadingService.loadingOff();
        console.log('Something wrong :', err.message);
      }
    );
    this.subs.sink = this.kanbanService.getInProgress().subscribe(
      (resp) => {
        if (!resp.length) {
          this.inProgress = [];
          this.loadingService.loadingOff();
          return;
        } else {
          console.log('inProgress', resp);
          this.inProgress = resp;
          this.loadingService.loadingOff();
        }
      },
      (err) => {
        this.loadingService.loadingOff();
        console.log('Something wrong :', err.message);
      }
    );
    this.subs.sink = this.kanbanService.getDone().subscribe(
      (resp) => {
        if (!resp.length) {
          this.done = [];
          this.loadingService.loadingOff();
          return;
        } else {
          console.log('done', resp);
          this.done = resp;
          this.loadingService.loadingOff();
        }
      },
      (err) => {
        this.loadingService.loadingOff();
        console.log('Something wrong :', err.message);
      }
    );
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
        edit: true,
      },
    });
    this.subs.sink = dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        this.loadingService.loadingOn();
        if (!result) {
          this.loadingService.loadingOff();
          return;
        }
        if (result.delete) {
          this.kanbanService.deleteItem(list, result.task);
        } else {
          this.kanbanService.updateItem(list, result.task);
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
    this.subs.sink = this.dialog
      .open(TaskDialogComponent, {
        width: '270px',
        data: {
          task: {},
          edit: false,
        },
      })
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        this.loadingService.loadingOn();
        if (!result) {
          this.loadingService.loadingOff();
          return;
        } else {
          this.kanbanService.createItem(result.task);
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
