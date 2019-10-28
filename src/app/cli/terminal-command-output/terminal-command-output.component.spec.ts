import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCommandOutputComponent } from './terminal-command-output.component';
import { By } from '@angular/platform-browser';
import { InitializedCommand } from '../store/command/command.reducers';
import { ChangeDetectionStrategy } from '@angular/core';

fdescribe('TerminalCommandOutputComponent', () => {
  let component: TerminalCommandOutputComponent;
  let fixture: ComponentFixture<TerminalCommandOutputComponent>;

  function getElements() {
    return {
      initializedCommandText: fixture.debugElement.query(By.css('.initialized-command-text'))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalCommandOutputComponent ]
    }).overrideComponent(TerminalCommandOutputComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalCommandOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show command text if a command is provided', () => {
    let elements = getElements();
    expect(elements.initializedCommandText).toBeFalsy();

    component.command = { text: 'test' } as InitializedCommand;
    fixture.detectChanges();

    elements = getElements();
    expect(elements.initializedCommandText).toBeTruthy();
    expect(elements.initializedCommandText.nativeElement.innerText).toEqual('> test');
  });
});
