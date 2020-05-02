import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidArgumentComponent } from './invalid-argument.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CONSTANTS } from 'src/app/models/constants';
import { ChangeDetectionStrategy } from '@angular/core';
import { SELECTORS } from 'src/test-helpers/common-selectors';

describe('InvalidParameterComponent', () => {
  let component: InvalidArgumentComponent;
  let fixture: ComponentFixture<InvalidArgumentComponent>;

  function getElements() {
    return {
      output: fixture.debugElement.query(By.css(SELECTORS.TERMINAL_OUTPUT))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ InvalidArgumentComponent ]
    }).overrideComponent(InvalidArgumentComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidArgumentComponent);
    component = fixture.componentInstance;

    component.params = { paramName: 'testparam', reason: 'bad data', value: '123' };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message with parameter, value, and reason', () => {
    const elements = getElements();
    expect(elements.output.nativeElement.classList).toContain('command-output-text--error');
    expect(elements.output.nativeElement.innerText).toEqual(
      `${CONSTANTS.CLI_OPTIONS.NAME}: invalid argument of '${component.params.value}' `
        + `for parameter '${component.params.paramName}': ${component.params.reason}`
    );
  });

  it('should display error message with parameter, value, and reason when no value', () => {
    component.params.value = null;
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.output.nativeElement.classList).toContain('command-output-text--error');
    expect(elements.output.nativeElement.innerText).toEqual(
      `${CONSTANTS.CLI_OPTIONS.NAME}: invalid argument of '' `
        + `for parameter '${component.params.paramName}': ${component.params.reason}`
    );
  });
});
