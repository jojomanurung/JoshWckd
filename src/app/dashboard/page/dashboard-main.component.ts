import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { ManagementService } from 'src/app/service/management/management.service';
import { SubSink } from 'subsink';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  project!: any[];

  constructor(
    private projectService: ManagementService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    this.loadingService.loadingOn();
    this.subs.sink = this.projectService.getProject().subscribe(
      (resp) => {
        if (!resp.length) {
          this.project = [];
          this.loadingService.loadingOff();
        } else {
          this.project = _.cloneDeep(resp);
          this.loadingService.loadingOff();
        }
      },
      (err) => {
        console.log('Something wrong : ', err);
        this.loadingService.loadingOff();
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
