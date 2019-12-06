import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingParameterComponent } from './missing-parameter.component';
import { TestModule } from 'src/test-helpers/test.modules';

describe('MissingParameterComponent', () => {
  let component: MissingParameterComponent;
  let fixture: ComponentFixture<MissingParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ MissingParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
