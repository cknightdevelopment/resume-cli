import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalComponent } from './terminal.component';
import { TerminalPromptComponent } from '../terminal-prompt/terminal-prompt.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CommandFacade } from '../store/command/command.facade';
import { CommandInitiated } from '../store/command/command.actions';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { InitializedCommand } from '../store/command/command.reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TerminalComponent', () => {
  let component: TerminalComponent;
  let promptComponent: TerminalPromptComponent;
  let fixture: ComponentFixture<TerminalComponent>;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    return {
      terminal: fixture.debugElement.query(By.css('.terminal')),
      commandOutputs: fixture.debugElement.queryAll(By.css('app-terminal-command-output')),
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        TestModule
      ],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
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
    mockCommandFacade = TestBed.get(CommandFacade);
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
    spyOn(mockCommandFacade, 'dispatch');
    promptComponent.commandInitiated.emit('chris test');

    fixture.detectChanges();

    expect(mockCommandFacade.dispatch).toHaveBeenCalledWith(new CommandInitiated('chris test'));
  });

  describe('history$', () => {
    it('should pass along history changes to prompt component', () => {
      const history = [{ text: 'test', initializedOn: new Date() }] as InitializedCommand[];
      mockCommandFacade.history$.next(history);
      fixture.detectChanges();

      expect(promptComponent.history).toEqual(history);
    });

    it('should not pass along history changes to prompt component when history length has not changed', () => {
      const expectedHistory = [{ text: 'test', initializedOn: new Date() }] as InitializedCommand[];
      mockCommandFacade.history$.next(expectedHistory);
      fixture.detectChanges();

      mockCommandFacade.history$.next([{ text: 'test2', initializedOn: new Date() }]);
      fixture.detectChanges();

      expect(promptComponent.history).toEqual(expectedHistory);
    });
  });

  describe('initialized commands', () => {
    it('should create terminal command output component for each initialized command', () => {
      mockCommandFacade.initializedCommand$.next({ text: 'test1', initializedOn: new Date() });
      fixture.detectChanges();
      mockCommandFacade.initializedCommand$.next({ text: 'test2', initializedOn: new Date() });
      fixture.detectChanges();

      const elements = getElements();
      expect(elements.commandOutputs.length).toEqual(2);
    });

    it('should not create terminal command output component for falsy initialized command', () => {
      mockCommandFacade.initializedCommand$.next(null);
      fixture.detectChanges();

      const elements = getElements();
      expect(elements.commandOutputs.length).toEqual(0);
    });
  });
});
