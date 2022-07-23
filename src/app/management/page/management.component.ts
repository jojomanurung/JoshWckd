import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ManagementService } from '@service/management/management.service';
import { LoadingService } from '@service/loading/loading.service';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  showTable = true;
  tablesData: any;
  projectEdit: any;

  constructor(
    private managementService: ManagementService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.loadingService.loadingOn();
    this.subs.sink = this.managementService.getProject().subscribe(
      (resp) => {
        // console.log(resp);
        if (!resp.length) {
          this.tablesData = [];
          this.loadingService.loadingOff();
        } else {
          console.log(resp);
          this.tablesData = _.cloneDeep(resp);
          this.loadingService.loadingOff();
        }
      },
      (err) => {
        console.log('something wrong : ', err);
        this.loadingService.loadingOff();
      }
    );
  }

  addProject() {
    this.showTable = false;
    this.projectEdit = null;
  }

  editProject(event: any) {
    if (!event) {
      return;
    }
    this.showTable = false;
    this.projectEdit = event;
  }

  deleteProject(event: any) {
    if (!event) {
      return;
    }
    this.managementService.deleteProject(event);
  }

  formAction(event: any) {
    if (event === 'cancel') {
      this.showTable = true;
    } else if (event === 'save') {
      this.showTable = true;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
