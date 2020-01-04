import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { By } from '@angular/platform-browser';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { TestModule } from 'src/test-helpers/test.modules';
import { CommandFacade } from '../../store/command/command.facade';
import { ChangeDetectionStrategy } from '@angular/core';
import { WorkHistoryExecuted } from '../../store/command/command.actions';
import { WorkHistoryComponent } from './work-history.component';

describe('WorkHistoryComponent', () => {
  let component: WorkHistoryComponent;
  let fixture: ComponentFixture<WorkHistoryComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    const output = fixture.debugElement.query(By.css(`${SELECTORS.TERMINAL_OUTPUT}`));
    const linkContainers = output.queryAll(By.css('.links-container .link-container'));

    const result = linkContainers.map(container => {
      return {
        container,
        icon: container.query(By.css('i')),
        link: container.query(By.css('a'))
      };
    });

    return output && result;
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

  // it('should display output for work history', () => {
  //   const links = [
  //     linkModel({ icon: 'icon1', title: 'title1', url: 'url1' }),
  //     linkModel({ icon: 'icon2', title: 'title2', url: 'url2' })
  //   ];

  //   mockCommandFacade.commandData.links$.next({ links });
  //   fixture.detectChanges();

  //   const elements = getElements();
  //   expect(elements.length).toEqual(2);
  //   elements.forEach((x, i) => {
  //     expect(x.icon.nativeElement.classList).toContain(links[i].icon);
  //     expect(x.link.nativeElement.getAttribute('href')).toEqual(links[i].url);
  //     expect(x.link.nativeElement.innerText).toEqual(links[i].title);
  //   });
  // });
});
