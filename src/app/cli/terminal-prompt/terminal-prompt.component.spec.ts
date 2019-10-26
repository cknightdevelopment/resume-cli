import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalPromptComponent } from './terminal-prompt.component';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import * as factory from 'src/test-helpers/factory/models';
import { By } from '@angular/platform-browser';
import { keyboard, KeyboardEventName } from 'src/test-helpers/dom-events';
import { CONSTANTS } from 'src/app/models/constants';
import { TestModule } from 'src/test-helpers/test.modules';
import { cold } from 'jasmine-marbles';
import { makeEventEmittersReplayable } from 'src/test-helpers/marbles-helpers';

describe('TerminalPromptComponent', () => {
  let component: TerminalPromptComponent;
  let fixture: ComponentFixture<TerminalPromptComponent>;

  function getElements() {
    return {
      input: fixture.debugElement.query(By.css('.terminal-input'))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [TerminalPromptComponent]
    }).overrideComponent(TerminalPromptComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalPromptComponent);
    component = fixture.componentInstance;
    makeEventEmittersReplayable(component);
    component.styles = factory.terminalNgStyle();
    spyOn(getElements().input.nativeElement, 'focus');
    fixture.detectChanges();
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });

  it('should foucs on textarea when loaded', () => {
    expect(getElements().input.nativeElement.focus).toHaveBeenCalled();
  });

  it('should apply provided ng styles to textarea', () => {
    const { input } = getElements();
    expect(input.styles).toEqual(jasmine.objectContaining({
      'background-color': 'black',
      color: 'white',
      'caret-color': 'white',
      'font-family': 'Arial',
      'font-size': '15px'
    }));
  });

  it('should handle tab', () => {
    const { input } = getElements();
    const { preventDefault } = keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.TAB });

    fixture.detectChanges();

    expect(preventDefault).toHaveBeenCalled();
  });


  it('should handle shift tab', () => {
    const { input } = getElements();
    const { preventDefault } = keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.TAB, shiftKey: true });

    fixture.detectChanges();

    expect(preventDefault).toHaveBeenCalled();
  });

  it('should handle enter', () => {
    const { input } = getElements();
    component.commandCtrl.patchValue('chris');
    const { preventDefault } = keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.ENTER });

    fixture.detectChanges();

    expect(preventDefault).toHaveBeenCalled();
    const expected = cold('a', { a: 'chris' });
    expect(component.commandInitiated).toBeObservable(expected);
  });

  describe('arrow keys', () => {
    let input: DebugElement;
    let commandCtrlPatchValueSpy: jasmine.Spy;

    beforeEach(() => {
      input = getElements().input;
      // mimicking user already had a value types in (useful for testing when nothing is supposed to happen)
      component.commandCtrl.patchValue('chris');
      fixture.detectChanges();
      commandCtrlPatchValueSpy = spyOn(component.commandCtrl, 'patchValue').and.callThrough();
    });

    describe('up arrow', () => {
      it('should prevent default', () => {
        const { preventDefault } = keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        fixture.detectChanges();
        expect(preventDefault).toHaveBeenCalled();
      });

      it('should handle when no history', () => {
        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        fixture.detectChanges();

        expect(commandCtrlPatchValueSpy).not.toHaveBeenCalled();
      });

      it('should iterate back in history', () => {
        component.history = [
          {text: '3', initializedOn: new Date()},
          {text: '2', initializedOn: new Date()},
          {text: '1', initializedOn: new Date()}
        ];
        fixture.detectChanges();

        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        fixture.detectChanges();
        expect(commandCtrlPatchValueSpy).toHaveBeenCalledWith('3');

        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        fixture.detectChanges();
        expect(commandCtrlPatchValueSpy).toHaveBeenCalledWith('2');

        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        fixture.detectChanges();
        expect(commandCtrlPatchValueSpy).toHaveBeenCalledWith('1');

        // once last history item is reached, continuing to hit up should display the last item
        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        fixture.detectChanges();
        expect(commandCtrlPatchValueSpy).toHaveBeenCalledWith('1');
      });
    });

    describe('down arrow', () => {
      it('should prevent default', () => {
        const { preventDefault } = keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.DOWN });
        fixture.detectChanges();
        expect(preventDefault).toHaveBeenCalled();
      });

      it('should handle when no history', () => {
        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.DOWN });
        fixture.detectChanges();

        expect(commandCtrlPatchValueSpy).not.toHaveBeenCalled();
      });

      it('should iterate forward in history', () => {
        component.history = [
          {text: '3', initializedOn: new Date()},
          {text: '2', initializedOn: new Date()},
          {text: '1', initializedOn: new Date()}
        ];
        fixture.detectChanges();

        // move to the last history item
        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.UP });
        fixture.detectChanges();

        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.DOWN });
        fixture.detectChanges();
        expect(commandCtrlPatchValueSpy).toHaveBeenCalledWith('2');

        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.DOWN });
        fixture.detectChanges();
        expect(commandCtrlPatchValueSpy).toHaveBeenCalledWith('3');

        // once first history item has already been shown, pressing down again clears out value
        keyboard(input, KeyboardEventName.KEYDOWN, { key: CONSTANTS.KEY_CODES.DOWN });
        fixture.detectChanges();
        expect(commandCtrlPatchValueSpy).toHaveBeenCalledWith(null);
      });
    });
  });
});