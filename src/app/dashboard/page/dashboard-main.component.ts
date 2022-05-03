import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class DashboardMainComponent implements OnInit, AfterViewInit, OnDestroy {
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

  ngAfterViewInit(): void {
    this.subs.sink = this.scrollbarRef.verticalScrolled
    .subscribe((resp) => {
      console.log(resp);
    })
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
      this.scrollbarRef.scrollTo({top: 0, duration: 2500, easing: {x1: .4, y1: .75, x2: .75, y2: .75}});
      return;
    }
    this.scrollbarRef.scrollToElement(elem, {duration: 2500, easing: {x1: .4, y1: .75, x2: .75, y2: .75}});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
