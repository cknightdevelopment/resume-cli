import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalOutputComponent } from './terminal-output.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  template: `
  <app-terminal-output
    [success]="success"
    [info]="info"
    [warn]="warn"
    [error]="error"
  >
    <div>Test</div>
  </app-terminal-output>
`
})
export class TestComponent {
  success = false;
  info = false;
  warn = false;
  error = false;
}

describe('TerminalOutputComponent', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let outputComponentDebugElement: DebugElement;
  let outputComponent: ComponentFixture<TerminalOutputComponent>;

  function getElements() {
    return {
      outputText: outputComponentDebugElement.query(By.css('.command-output-text'))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TerminalOutputComponent,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;

    outputComponentDebugElement = fixture.debugElement.query(By.directive(TerminalOutputComponent));
    outputComponent = outputComponentDebugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should transclude content', () => {
    const elements = getElements();
    expect(elements.outputText.nativeElement.innerHTML).toEqual('<div>Test</div>');
  });

  it('should have success class when appropriate', () => {
    testComponent.success = true;
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.outputText.nativeElement.classList).toContain('command-output-text--success');
  });

  it('should have info class when appropriate', () => {
    testComponent.info = true;
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.outputText.nativeElement.classList).toContain('command-output-text--info');
  });

  it('should have warn class when appropriate', () => {
    testComponent.warn = true;
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.outputText.nativeElement.classList).toContain('command-output-text--warn');
  });

  it('should have error class when appropriate', () => {
    testComponent.error = true;
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.outputText.nativeElement.classList).toContain('command-output-text--error');
  });
});
