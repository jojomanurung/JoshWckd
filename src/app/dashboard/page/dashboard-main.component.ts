import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SubSink } from 'subsink';
import { NgScrollbar } from 'ngx-scrollbar';
import { NavService } from '@service/nav/nav.service';
import { ManagementService } from '@service/management/management.service';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
})
export class DashboardMainComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild('about', { static: false }) about!: ElementRef;
  @ViewChild('resume', { static: false }) resume!: ElementRef;
  @ViewChild('work', { static: false }) work!: ElementRef;
  private subs = new SubSink();
  visibility = 'home-active';
  isMobile = false;
  project!: any[];
  isLoading = false;
  navbarOpen = false;

  constructor(
    private navService: NavService,
    private projectService: ManagementService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.layoutObserver();
    this.getProject();
  }

  ngAfterViewInit(): void {
    this.subs.sink = this.scrollbarRef.scrolled.subscribe((resp) => {
      // Get all section element offsetTop value first
      const { about, resume, work } = {
        about: this.about.nativeElement.offsetTop,
        resume: this.resume.nativeElement.offsetTop,
        work: this.work.nativeElement.offsetTop,
      };

      let visibility: string;

      resp.target.scrollTop < about
        ? (visibility = 'home-active')
        : resp.target.scrollTop < resume
        ? (visibility = 'about-active')
        : resp.target.scrollTop < work
        ? (visibility = 'resume-active')
        : resp.target.scrollTop >= work
        ? (visibility = 'work-active')
        : (visibility = '');

      this.zone.run(() => (this.visibility = visibility));
    });
  }

  layoutObserver() {
    this.subs.sink = this.navService.isMobile.subscribe(
      (isMobile) => (this.isMobile = isMobile)
    );
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

  smoothScroll(elem: HTMLElement) {
    this.navbarOpen = false;
    this.scrollbarRef.scrollToElement(elem, {
      duration: 1700,
      easing: { x1: 0.42, y1: 0, x2: 0.58, y2: 1 },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
