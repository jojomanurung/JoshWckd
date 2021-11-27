import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { ProjectManagementService } from 'src/app/service/project-management/project-management.service';
import { SubSink } from 'subsink';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  showTable = true;
  tablesData: any;
  projectEdit: any;

  constructor(
    private managementService: ProjectManagementService,
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
