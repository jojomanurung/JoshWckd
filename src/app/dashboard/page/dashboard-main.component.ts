import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { ManagementService } from 'src/app/service/management/management.service';
import { SubSink } from 'subsink';
import * as _ from 'lodash-es';
import { NavService } from 'src/app/service/nav/nav.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  isMobile = false;
  project!: any[];
  isLoading = false;

  constructor(
    private navService: NavService,
    private projectService: ManagementService
  ) {}

  ngOnInit(): void {
    this.layoutObserver();
    this.getProject();
  }

  layoutObserver() {
    this.subs.sink = this.navService.isMobile.subscribe((resp) => this.isMobile = resp);
  }

  getProject() {
    this.isLoading = true;
    this.subs.sink = this.projectService.getProject().subscribe(
      (resp) => {
        this.project = _.cloneDeep(resp);
        this.isLoading = false;
      },
      (err) => {
        console.log('Something wrong : ', err);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
