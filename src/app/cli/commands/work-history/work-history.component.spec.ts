import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { By } from '@angular/platform-browser';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { TestModule } from 'src/test-helpers/test.modules';
import { CommandFacade } from '../../store/command/command.facade';
import { ChangeDetectionStrategy } from '@angular/core';
import { WorkHistoryExecuted } from '../../store/command/command.actions';
import { WorkHistoryComponent } from './work-history.component';
import { workHistoryModel } from 'src/test-helpers/factory/models';

describe('WorkHistoryComponent', () => {
  let component: WorkHistoryComponent;
  let fixture: ComponentFixture<WorkHistoryComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    const workHistories = fixture.debugElement.queryAll(By.css(`${SELECTORS.TERMINAL_OUTPUT} .work-history-container .work-history-item`));

    return (workHistories || []).map(wh => ({
        employer: wh.query(By.css('.work-history--top-level :first-child')),
        position: wh.query(By.css('.work-history--top-level :nth-child(2)')),
        dates: wh.query(By.css('.work-history--top-level :nth-child(3)')),
        details: wh.queryAll(By.css('.work-history--details li'))
    }));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
      ],
      declarations: [WorkHistoryComponent]
    }).overrideComponent(WorkHistoryComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkHistoryComponent);
    component = fixture.componentInstance;

    component.params = {};
    mockCommandFacade = TestBed.get(CommandFacade);
    dispatchSpy = spyOn(mockCommandFacade, 'dispatch');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch work history execution', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(new WorkHistoryExecuted(component.params));
  });

  it('should display work history data', () => {
    const workHistory = [ workHistoryModel(), workHistoryModel() ];

    mockCommandFacade.commandData.workHistory$.next({ workHistory });
    fixture.detectChanges();

    const elements = getElements();
    elements.forEach((wh, whi) => {
      expect(wh.employer.nativeElement.innerText).toEqual(workHistory[0].employer);
      expect(wh.position.nativeElement.innerText).toEqual(workHistory[0].position);
      expect(wh.dates.nativeElement.innerText).toEqual(`${workHistory[0].start} - ${workHistory[0].end}`);
      wh.details.forEach((detail, detaili) => {
        expect(detail.nativeElement.innerText).toEqual(workHistory[whi].details[detaili]);
      });
    });
  });

  it('should not display work history details if there are none', () => {
    const workHistory = [ workHistoryModel({ details: null }) ];

    mockCommandFacade.commandData.workHistory$.next({ workHistory });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements[0].details.length).toEqual(0);
  });

  it('should not display work history if none is provided', () => {
    const workHistory = [];

    mockCommandFacade.commandData.workHistory$.next({ workHistory });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.length).toEqual(0);
  });
});
