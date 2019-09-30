import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalComponent } from './terminal.component';
import { TerminalPromptComponent } from '../terminal-prompt/terminal-prompt.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';

describe('TerminalComponent', () => {
  let component: TerminalComponent;
  let fixture: ComponentFixture<TerminalComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
