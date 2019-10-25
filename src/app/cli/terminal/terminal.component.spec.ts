import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalComponent } from './terminal.component';
import { TerminalPromptComponent } from '../terminal-prompt/terminal-prompt.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CommandFacade } from '../store/command/command.facade';
import { CommandInitiated } from '../store/command/command.actions';

describe('TerminalComponent', () => {
  let component: TerminalComponent;
  let promptComponent: TerminalPromptComponent;
  let fixture: ComponentFixture<TerminalComponent>;
  let commandFacade: CommandFacade;

  function getElements() {
    return {
      terminal: fixture.debugElement.query(By.css('.terminal'))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      declarations: [
        TerminalComponent,
        TerminalPromptComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalComponent);
    component = fixture.componentInstance;
    promptComponent = fixture.debugElement.query(By.directive(TerminalPromptComponent)).componentInstance;
    commandFacade = TestBed.get(CommandFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(TerminalPromptComponent).toBeTruthy();
  });

  it('should apply provided ng styles to terminal', () => {
    const { terminal } = getElements();
    expect(terminal.styles).toEqual(jasmine.objectContaining({
      'background-color': 'black',
      color: 'white',
      'caret-color': 'white',
      'font-family': 'Arial',
      'font-size': '15px'
    }));
  });

  it('should initiate command', () => {
    spyOn(commandFacade, 'dispatch');
    promptComponent.commandInitiated.emit('chris test');

    fixture.detectChanges();

    expect(commandFacade.dispatch).toHaveBeenCalledWith(new CommandInitiated('chris test'));
  });
});
