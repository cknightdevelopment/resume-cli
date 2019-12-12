import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandOutputComponent } from './terminal-command-output.component';
import { By } from '@angular/platform-browser';
import { InitializedCommand } from '../store/command/command.reducers';
import { ChangeDetectionStrategy, Input, Component, NgModule } from '@angular/core';
import { CommandService } from 'src/app/core/command/command.service';
import { CommandComponent } from '../commands/command.component';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { CommonModule } from '@angular/common';
import { query } from '@angular/animations';
import { ParseStatus } from 'src/app/models/command/parse-status.model';
import { CommandParserService } from 'src/app/core/command/command-parser/command-parser.service';

interface MockCommandInputParams {
  test: number;
}

@Component({
  template: `<div class="command-json">{{ params | json }}</div>`
})
class MockCommandComponent implements CommandComponent<MockCommandComponent> {
  @Input() params: MockCommandComponent;

  constructor() {}
}

class MockCommandParserService {
  static paramsToReturn = { test: 123 } as MockCommandInputParams;

  parseCommand(): ParsedCommandInput {
    return {
      status: ParseStatus.Parsed,
      name: 'Mock' as any,
      componentType: MockCommandComponent as any,
      params: MockCommandParserService.paramsToReturn as any
    };
  }
}

@NgModule({
  declarations: [MockCommandComponent],
  entryComponents: [
    MockCommandComponent,
  ],
  imports: [
    CommonModule
  ]
})
class MockModule {}


describe('TerminalCommandOutputComponent', () => {
  let component: TerminalCommandOutputComponent;
  let fixture: ComponentFixture<TerminalCommandOutputComponent>;

  function getElements() {
    return {
      initializedCommandText: fixture.debugElement.query(By.css('.initialized-command-text')),
      mockCommandJsonElement: fixture.debugElement.query(By.css('.command-json'))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule
      ],
      declarations: [
        TerminalCommandOutputComponent
      ],
      providers: [
        { provide: CommandParserService, useClass: MockCommandParserService }
      ],
    }).overrideComponent(TerminalCommandOutputComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCommandOutputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('no command provided', () => {
    it('should not show command text if a command is not provided', () => {
      const elements = getElements();
      expect(elements.initializedCommandText).toBeTruthy();
      expect(elements.initializedCommandText.nativeElement.innerText).toEqual('>');
    });
  });

  describe('command provided', () => {
    beforeEach(() => {
      component.command = { text: 'test', initializedOn: new Date() } as InitializedCommand;
      fixture.detectChanges();
    });

    it('should show command text only if a command is provided', () => {
      const elements = getElements();
      expect(elements.initializedCommandText).toBeTruthy();
      expect(elements.initializedCommandText.nativeElement.innerText).toEqual('> test');
    });

    it('should show command text only if a command is provided', () => {
      const elements = getElements();
      expect(elements.mockCommandJsonElement).toBeTruthy();
      expect(JSON.parse(elements.mockCommandJsonElement.nativeElement.innerText)).toEqual(MockCommandParserService.paramsToReturn);
    });
  });
});
