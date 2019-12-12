import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCommandComponent } from './random-command.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CommandFacade } from '../../store/command/command.facade';
import { RandomExecuted } from '../../store/command/command.actions';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';

describe('RandomCommandComponent', () => {
  let component: RandomCommandComponent;
  let fixture: ComponentFixture<RandomCommandComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    return {
      output: fixture.debugElement.queryAll(By.css(SELECTORS.TERMINAL_OUTPUT))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
      ],
      declarations: [ RandomCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCommandComponent);
    component = fixture.componentInstance;

    component.params = { count: 3 };
    mockCommandFacade = TestBed.get(CommandFacade);
    dispatchSpy = spyOn(mockCommandFacade, 'dispatch');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch random execution', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(new RandomExecuted(component.params));
  });

  it('should display output for each fact', () => {
    mockCommandFacade.commandData.random$.next({
      facts: ['Fact1', 'Fact2', 'Fact3']
    });

    fixture.detectChanges();

    const elements = getElements();
    expect(elements.output.length).toEqual(3);
    expect(elements.output[0].nativeElement.innerText).toEqual('Fact1');
    expect(elements.output[1].nativeElement.innerText).toEqual('Fact2');
    expect(elements.output[2].nativeElement.innerText).toEqual('Fact3');
  });
});
