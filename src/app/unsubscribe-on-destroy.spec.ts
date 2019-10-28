import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from './unsubscribe-on-destroy';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: ''
})
export class MockComponent extends UnsubscribeOnDestroy implements OnInit {
  obs$ = new Subject();
  isObsComplete = false;

  ngOnInit() {
    this.obs$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {}, () => {}, () => this.isObsComplete = true);
  }
}

describe('UnsubscribeOnDestroy', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should complete subscriptions using takeUntil utilizing destoy$ when item is destroyed', () => {
    // tslint:disable-next-line: no-string-literal
    const destroySubUnsubscribeSpy = spyOn(component['destroySub$'], 'unsubscribe');
    expect(component.isObsComplete).toBeFalsy();
    component.ngOnDestroy();

    fixture.detectChanges();

    expect(component.isObsComplete).toBeTruthy();
    expect(destroySubUnsubscribeSpy).toHaveBeenCalledTimes(1);
  });
});
