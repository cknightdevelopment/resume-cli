import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownCommandComponent } from './unknown-command.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CONSTANTS } from 'src/app/models/constants';
import { ChangeDetectionStrategy } from '@angular/core';
import { CommandNames } from 'src/app/models/command/command-names.model';
import { SELECTORS } from 'src/test-helpers/common-selectors';

describe('UnknownCommandComponent', () => {
  let component: UnknownCommandComponent;
  let fixture: ComponentFixture<UnknownCommandComponent>;

  function getElements() {
    return {
      output: fixture.debugElement.query(By.css(SELECTORS.TERMINAL_OUTPUT))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [ UnknownCommandComponent ]
    }).overrideComponent(UnknownCommandComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownCommandComponent);
    component = fixture.componentInstance;

    component.params = { commandText: 'testcommand' };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message with attempted command', () => {
    const elements = getElements();
    expect(elements.output.nativeElement.classList).toContain('command-output-text--error');
    expect(elements.output.nativeElement.innerText).toEqual(
      // tslint:disable-next-line: max-line-length
      `${CONSTANTS.CLI_NAME}: 'testcommand' is not a ${CONSTANTS.CLI_NAME} command. See '${CONSTANTS.CLI_NAME} ${CommandNames.Help}'.`
    );
  });
});
