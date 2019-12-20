import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCommandComponent } from './random-command.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CommandFacade } from '../../store/command/command.facade';
import { RandomExecuted } from '../../store/command/command.actions';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { ChangeDetectionStrategy } from '@angular/core';

describe('RandomCommandComponent', () => {
  let component: RandomCommandComponent;
  let fixture: ComponentFixture<RandomCommandComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    return {
      items: fixture.debugElement.queryAll(By.css(`${SELECTORS.TERMINAL_OUTPUT} ul li`))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
      ],
      declarations: [RandomCommandComponent]
    }).overrideComponent(RandomCommandComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
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
    expect(elements.items.length).toEqual(3);
    expect(elements.items[0].nativeElement.innerText).toEqual('Fact1');
    expect(elements.items[1].nativeElement.innerText).toEqual('Fact2');
    expect(elements.items[2].nativeElement.innerText).toEqual('Fact3');
  });
});
