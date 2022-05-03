import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { ManagementService } from 'src/app/service/management/management.service';
import { SubSink } from 'subsink';
import * as _ from 'lodash-es';
import { NavService } from 'src/app/service/nav/nav.service';
import { NgScrollbar } from 'ngx-scrollbar';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
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

  smoothScroll(elem: string) {
    if (elem === '#home') {
      this.scrollbarRef.scrollTo({top: 0, duration: 1700, easing: {x1: .42, y1: 0, x2: .58, y2: 1}});
      return;
    }
    this.scrollbarRef.scrollToElement(elem, {duration: 1700, easing: {x1: .42, y1: 0, x2: .58, y2: 1}});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
