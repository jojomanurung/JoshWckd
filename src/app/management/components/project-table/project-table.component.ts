import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss'],
})
export class ProjectTableComponent implements OnChanges {
  @Input() project!: any[];
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  displayedColumns = ['name', 'description', 'status', 'link', 'action'];
  dataSource = new MatTableDataSource();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // this is to detect every changes emitted from parent component
    // we are looping all input name inside SimpleChanges
    // then log the input that emit new value and prev value
    for (let propName in changes) {
      // let change = changes[propName];
      // let curVal = change.currentValue;
      // let prevVal = change.previousValue;
      // console.log(curVal);
      // console.log(prevVal);

      if (propName === 'project') {
        this.setTable();
      }
    }
  }

  setTable() {
    this.dataSource.data = this.project;
  }
}
