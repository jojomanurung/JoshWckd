import { Observable, Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

export enum IntersectionStatus {
  Visible = 'Visible',
  Pending = 'Pending',
  NotVisible = 'NotVisible',
}

export const viewIntersectionObserver = (
  element: HTMLElement,
  config: IntersectionObserverInit,
  debounce = 0
) =>
  new Observable<IntersectionStatus>((subscriber) => {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry;
      observer: IntersectionObserver;
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (isIntersecting(entry)) {
            subject$.next({ entry, observer });
          } else {
            subscriber.next(IntersectionStatus.NotVisible);
          }
        });
      },
      config
    );

    subject$.subscribe(() => {
      subscriber.next(IntersectionStatus.Pending);
    });

    subject$
      .pipe(debounceTime(debounce), filter(Boolean))
      .subscribe(async ({ entry, observer }: any) => {
        const isEntryVisible = await isVisible(entry.target as HTMLElement);

        if (isEntryVisible) {
          subscriber.next(IntersectionStatus.Visible);
        } else {
          subscriber.next(IntersectionStatus.NotVisible);
        }
      });

    intersectionObserver.observe(element);

    return {
      unsubscribe() {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      },
    };
  });

export const loopIntersectionObserver = (
  element: HTMLElement,
  config: IntersectionObserverInit,
  debounce = 0
) =>
  new Observable<IntersectionStatus>((subscriber) => {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry;
      observer: IntersectionObserver;
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (isIntersecting(entry)) {
            subject$.next({ entry, observer });
          }
        });
      },
      config
    );

    subject$.subscribe(() => {
      subscriber.next(IntersectionStatus.Pending);
    });

    subject$
      .pipe(debounceTime(debounce), filter(Boolean))
      .subscribe(async ({ entry, observer }: any) => {
        const isEntryVisible = await isVisible(entry.target as HTMLElement);

        if (isEntryVisible) {
          subscriber.next(IntersectionStatus.Visible);
          observer.unobserve(entry.target);
        } else {
          subscriber.next(IntersectionStatus.NotVisible);
        }
      });

    intersectionObserver.observe(element);

    return {
      unsubscribe() {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      },
    };
  });

async function isVisible(element: HTMLElement) {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver(([entry]) => {
      resolve(entry.isIntersecting);
      observer.disconnect();
    });

    observer.observe(element);
  });
}

function isIntersecting(entry: IntersectionObserverEntry) {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}
