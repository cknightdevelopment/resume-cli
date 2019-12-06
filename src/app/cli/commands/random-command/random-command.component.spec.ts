import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCommandComponent } from './random-command.component';
import { TestModule } from 'src/test-helpers/test.modules';

describe('RandomCommandComponent', () => {
  let component: RandomCommandComponent;
  let fixture: ComponentFixture<RandomCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ RandomCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
