import { Directive, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Directive()
export abstract class UnsubscribeOnDestroy implements OnDestroy {
  private destroySub$ = new Subject<void>();
  public destroy$: Observable<void>;

  constructor() {
    this.destroy$ = this.destroySub$.asObservable();
  }

  ngOnDestroy() {
    this.destroySub$.next();
    this.destroySub$.unsubscribe();
  }
}
