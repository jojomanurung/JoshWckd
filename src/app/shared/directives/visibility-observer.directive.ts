/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';
import {
  viewIntersectionObserver,
  IntersectionStatus,
} from '../interface/visibility-observer/visibility-observer';

@Directive({
  selector: '[visibilityObserver]',
})
export class VisibilityObserverDirective implements OnInit, OnDestroy {
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot!: HTMLElement;
  @Input() intersectionThreshold!: number | number[];
  @Output() visible = new EventEmitter<IntersectionStatus>();

  private destroy$ = new Subject();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const element = this.element.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold,
    };

    viewIntersectionObserver(element, config, this.intersectionDebounce)
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        this.visible.emit(status);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
