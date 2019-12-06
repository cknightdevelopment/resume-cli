import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownParameterComponent } from './unknown-parameter.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { CommandNames } from 'src/app/models/command/command-names.model';
import { By } from '@angular/platform-browser';
import { CONSTANTS } from 'src/app/models/constants';

describe('UnknownParameterComponent', () => {
  let component: UnknownParameterComponent;
  let fixture: ComponentFixture<UnknownParameterComponent>;

  function getElements() {
    return {
      output: fixture.debugElement.query(By.css('app-terminal-output .command-output-text'))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ UnknownParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownParameterComponent);
    component = fixture.componentInstance;

    component.params = { command: CommandNames.Random, paramName: 'testparam' };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message with attempted command and parameter', () => {
    const elements = getElements();
    expect(elements.output.nativeElement.classList).toContain('command-output-text--error');
    expect(elements.output.nativeElement.innerText).toEqual(
      `${CONSTANTS.CLI_NAME}: '${component.params.paramName}' is not a parameter for ${component.params.command} command`
    );
  });
});
