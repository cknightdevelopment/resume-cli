import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyDirective } from './unsubscribe-on-destroy';
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: ''
})
export class MockComponent extends UnsubscribeOnDestroyDirective implements OnInit {
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

  beforeEach(waitForAsync(() => {
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
    // eslint-disable-next-line dot-notation, @typescript-eslint/dot-notation
    const destroySubUnsubscribeSpy = spyOn(component['destroySub$'], 'unsubscribe');
    expect(component.isObsComplete).toBeFalsy();
    component.ngOnDestroy();

    fixture.detectChanges();

    expect(component.isObsComplete).toBeTruthy();
    expect(destroySubUnsubscribeSpy).toHaveBeenCalledTimes(1);
  });
});
