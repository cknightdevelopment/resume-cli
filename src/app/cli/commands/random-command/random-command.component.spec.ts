import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCommandComponent } from './random-command.component';

xdescribe('RandomCommandComponent', () => {
  let component: RandomCommandComponent;
  let fixture: ComponentFixture<RandomCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
