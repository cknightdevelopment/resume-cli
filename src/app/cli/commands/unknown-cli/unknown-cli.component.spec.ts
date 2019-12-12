import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownCliComponent } from './unknown-cli.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { SELECTORS } from 'src/test-helpers/common-selectors';

describe('UnknownCliComponent', () => {
  let component: UnknownCliComponent;
  let fixture: ComponentFixture<UnknownCliComponent>;

  function getElements() {
    return {
      output: fixture.debugElement.query(By.css(SELECTORS.TERMINAL_OUTPUT))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ UnknownCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownCliComponent);
    component = fixture.componentInstance;

    component.params = { cliName: 'testcli' };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message with attempted cli', () => {
    const elements = getElements();
    expect(elements.output.nativeElement.classList).toContain('command-output-text--error');
    expect(elements.output.nativeElement.innerText).toEqual(
      `unknown cli: '${component.params.cliName}'`
    );
  });
});
