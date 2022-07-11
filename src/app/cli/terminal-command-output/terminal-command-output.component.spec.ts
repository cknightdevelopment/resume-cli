import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandOutputComponent } from './terminal-command-output.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Input, Component, NgModule } from '@angular/core';
import { CommandComponent } from '../commands/command.component';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { CommonModule } from '@angular/common';
import { ParseStatus } from 'src/app/models/command/parse-status.model';


@Component({
  template: `<div class="command-json">{{ params | json }}</div>`
})
class MockCommandComponent implements CommandComponent<MockCommandComponent> {
  @Input() params: MockCommandComponent;

  constructor() {}
}

@NgModule({
  declarations: [MockCommandComponent],
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
      initializedCommandText: fixture.debugElement.query(By.css('.initialized-command-text--content')),
      mockCommandJsonElement: fixture.debugElement.query(By.css('.command-json'))
    };
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule
      ],
      declarations: [
        TerminalCommandOutputComponent
      ]
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
      expect(elements.initializedCommandText.nativeElement.innerText).toEqual('');
    });
  });

  describe('command provided', () => {
    beforeEach(() => {
      component.command = {
        initialized: { text: 'test', initializedOn: new Date() },
        parsed: {
          status: ParseStatus.Parsed,
          name: 'Mock' as any,
          componentType: MockCommandComponent as any,
          params: { test: 123 } as any
        }
      };
      fixture.detectChanges();
    });

    it('should show command text only if an initialized command is provided', () => {
      const elements = getElements();
      expect(elements.initializedCommandText).toBeTruthy();
      expect(elements.initializedCommandText.nativeElement.innerText).toEqual('test');
    });

    it('should show command component only if a parsed command is provided', () => {
      const elements = getElements();
      expect(elements.mockCommandJsonElement).toBeTruthy();
      expect(JSON.parse(elements.mockCommandJsonElement.nativeElement.innerText)).toEqual({ test: 123 });
    });
  });
});
