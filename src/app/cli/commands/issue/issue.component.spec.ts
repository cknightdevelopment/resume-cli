import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { By } from '@angular/platform-browser';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { TestModule } from 'src/test-helpers/test.modules';
import { CommandFacade } from '../../store/command/command.facade';
import { ChangeDetectionStrategy } from '@angular/core';
import { IssueExecuted } from '../../store/command/command.actions';
import { IssueComponent } from './issue.component';
import { issueModel } from 'src/test-helpers/factory/models';

describe('IssueComponent', () => {
  let component: IssueComponent;
  let fixture: ComponentFixture<IssueComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
      ],
      declarations: [IssueComponent]
    }).overrideComponent(IssueComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueComponent);
    component = fixture.componentInstance;

    component.params = {};
    mockCommandFacade = TestBed.inject(CommandFacade) as any;
    dispatchSpy = spyOn(mockCommandFacade, 'dispatch');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch issue execution', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(new IssueExecuted(component.params));
  });

  it('should open issue url is new tab when execution data is received', () => {
    spyOn(window, 'open');
    const issue = issueModel({ title: null });

    mockCommandFacade.commandData.issue$.next({ issue });
    fixture.detectChanges();

    expect(window.open).toHaveBeenCalledWith(`${issue.url}?title=`, '_blank');
  });

  it('should open issue url with title when one is provided', () => {
    spyOn(window, 'open');
    const issue = issueModel({ title: 'test title' });

    mockCommandFacade.commandData.issue$.next({ issue });
    fixture.detectChanges();

    expect(window.open).toHaveBeenCalledWith(`${issue.url}?title=${issue.title}`, '_blank');
  });
});
