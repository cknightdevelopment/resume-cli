import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidParameterComponent } from './invalid-parameter.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CONSTANTS } from 'src/app/models/constants';
import { SELECTORS } from 'src/test-helpers/common-selectors';

describe('InvalidParameterComponent', () => {
  let component: InvalidParameterComponent;
  let fixture: ComponentFixture<InvalidParameterComponent>;

  function getElements() {
    return {
      output: fixture.debugElement.query(By.css(SELECTORS.TERMINAL_OUTPUT))
    };
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ InvalidParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidParameterComponent);
    component = fixture.componentInstance;

    component.params = { paramName: '???testparam???' };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message with invalid parameter', () => {
    const elements = getElements();
    expect(elements.output.nativeElement.classList).toContain('command-output-text--error');
    expect(elements.output.nativeElement.innerText).toEqual(
      `${CONSTANTS.CLI_OPTIONS.NAME}: Invalid parameter syntax: '${component.params.paramName}'`
    );
  });
});
