import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TerminalComponent } from './terminal.component';
import { TerminalPromptComponent } from '../terminal-prompt/terminal-prompt.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CommandFacade } from '../store/command/command.facade';
import { CommandInitiated } from '../store/command/command.actions';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { InitializedCommand } from '../store/command/command.reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { ParseStatus } from 'src/app/models/command/parse-status.model';
import { HelpComponent } from '../commands/help/help.component';
import { CommandParserService } from 'src/app/core/command/command-parser/command-parser.service';
import { convertPropertyToGetterSetter } from 'src/test-helpers/dom-events';

class MockCommandParserService {
  static parsedCommandToReturn = {
    status: ParseStatus.Parsed,
    name: 'Mock' as any,
    componentType: HelpComponent as any,
    params: { test: 123 } as any
  };

  parseCommand(): ParsedCommandInput {
    return MockCommandParserService.parsedCommandToReturn;
  }
}

describe('TerminalComponent', () => {
  let component: TerminalComponent;
  let promptComponent: TerminalPromptComponent;
  let fixture: ComponentFixture<TerminalComponent>;
  let mockCommandFacade: MockCommandFacade;
  let mockCommandParserSvc: MockCommandParserService;

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
        { provide: CommandFacade, useClass: MockCommandFacade },
        { provide: CommandParserService, useClass: MockCommandParserService }
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
    mockCommandParserSvc = TestBed.get(CommandParserService);
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
    it('should create terminal command output component for each initialized command with parsed result', () => {
      spyOn(mockCommandParserSvc, 'parseCommand').and.callThrough();

      const initializedCommand = { text: 'test', initializedOn: new Date() } as InitializedCommand;
      mockCommandFacade.initializedCommand$.next(initializedCommand);
      fixture.detectChanges();

      const elements = getElements();
      expect(mockCommandParserSvc.parseCommand).toHaveBeenCalledWith('test');
      expect(component.commands).toEqual([{
        initialized: initializedCommand,
        parsed: MockCommandParserService.parsedCommandToReturn
      }]);
      expect(elements.commandOutputs.length).toEqual(1);
    });

    it('should scroll to bottom of terminal after initialized command fired in next browser turn', fakeAsync(() => {
      spyOn(mockCommandParserSvc, 'parseCommand').and.callThrough();

      const elements = getElements();
      // do this so that we can control how things are set and make it testable
      convertPropertyToGetterSetter(elements.terminal.nativeElement, 'scrollTop', 0);

      const initializedCommand = { text: 'test', initializedOn: new Date() } as InitializedCommand;
      mockCommandFacade.initializedCommand$.next(initializedCommand);
      fixture.detectChanges();

      expect(elements.terminal.nativeElement.scrollTop).toEqual(0);
      tick();
      expect(elements.terminal.nativeElement.scrollTop).toEqual(elements.terminal.nativeElement.scrollHeight);
    }));

    it('should clear terminal command command output when initialized command with status of clear', () => {
      spyOn(mockCommandParserSvc, 'parseCommand').and.returnValue({
        status: ParseStatus.Clear
      });

      // add one item to the commands, so we can test that it gets cleared
      component.commands = [{ initialized: {} as any, parsed: {} as any }];
      fixture.detectChanges();

      const initializedCommand = { text: 'test', initializedOn: new Date() } as InitializedCommand;
      mockCommandFacade.initializedCommand$.next(initializedCommand);
      fixture.detectChanges();

      const elements = getElements();
      expect(component.commands).toEqual([]);
      expect(elements.commandOutputs.length).toEqual(0);
    });

    it('should not create terminal command output component for falsy initialized command', () => {
      mockCommandFacade.initializedCommand$.next(null);
      fixture.detectChanges();

      const elements = getElements();
      expect(elements.commandOutputs.length).toEqual(0);
    });
  });
});
