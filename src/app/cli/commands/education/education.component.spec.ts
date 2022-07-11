import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from 'src/test-helpers/test.modules';
import { By } from '@angular/platform-browser';
import { CommandFacade } from '../../store/command/command.facade';
import { EducationExecuted } from '../../store/command/command.actions';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { ChangeDetectionStrategy } from '@angular/core';
import { EducationComponent } from './education.component';
import * as factory from 'src/test-helpers/factory/models';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    const output = fixture.debugElement.query(By.css(`${SELECTORS.TERMINAL_OUTPUT}`));
    return output
      ? {
        logo: output.query(By.css('.education-item img')),
        nameLink: output.query(By.css('.education-item a.education-item--name')),
        nameSpan: output.query(By.css('.education-item span.education-item--name')),
        location: output.query(By.css('.education-item--location')),
        dates: output.query(By.css('.education-item--dates')),
        highlightsContainer: output.query(By.css('.education-item--highlights')),
        highlights: output.queryAll(By.css('.education-item--highlights li')),
        otherContainer: output.query(By.css('.education-item--other')),
        other: output.queryAll(By.css('.education-item--other ul li')),
      }
      : null;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
      ],
      declarations: [EducationComponent]
    }).overrideComponent(EducationComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;

    component.params = {};
    mockCommandFacade = TestBed.inject(CommandFacade) as any;
    dispatchSpy = spyOn(mockCommandFacade, 'dispatch');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch education execution', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(new EducationExecuted(component.params));
  });

  it('should display output for education', () => {
    const edu = factory.educationModel();
    mockCommandFacade.commandData.education$.next({ education: [edu] });

    fixture.detectChanges();

    const elements = getElements();
    expect(elements.logo.nativeElement.getAttribute('src')).toEqual(edu.logoUrl);
    expect(elements.logo.nativeElement.getAttribute('alt')).toEqual(edu.name);
    expect(elements.logo.nativeElement.getAttribute('height')).toEqual(edu.logoHeight);
    expect(elements.location.nativeElement.innerText).toEqual(edu.location);
    expect(elements.dates.nativeElement.innerText).toEqual(`${edu.start} - ${edu.end}`);
    edu.highlights.forEach((highlight, i) => {
      expect(elements.highlights[i].nativeElement.innerText).toEqual(highlight);
    });
    edu.other.forEach((o, i) => {
      expect(elements.other[i].nativeElement.innerText).toEqual(o);
    });
  });

  it('should not display logo if not provided', () => {
    const edu = factory.educationModel({ logoUrl: null });
    mockCommandFacade.commandData.education$.next({ education: [edu] });

    fixture.detectChanges();

    const elements = getElements();
    expect(elements.logo).toBeFalsy();
  });

  it('should not display name span if url is provided', () => {
    const edu = factory.educationModel({ url: 'http://college.com' });
    mockCommandFacade.commandData.education$.next({ education: [edu] });

    fixture.detectChanges();

    const elements = getElements();
    expect(elements.nameLink).toBeTruthy();
    expect(elements.nameSpan).toBeFalsy();
  });

  it('should not display name link if url is not provided', () => {
    const edu = factory.educationModel({ url: null });
    mockCommandFacade.commandData.education$.next({ education: [edu] });

    fixture.detectChanges();

    const elements = getElements();
    expect(elements.nameLink).toBeFalsy();
    expect(elements.nameSpan).toBeTruthy();
  });

  it('should not display highlights section if not provided', () => {
    const edu = factory.educationModel({ highlights: [] });
    mockCommandFacade.commandData.education$.next({ education: [edu] });

    fixture.detectChanges();

    const elements = getElements();
    expect(elements.highlightsContainer).toBeFalsy();
  });

  it('should not display other section if not provided', () => {
    const edu = factory.educationModel({ other: [] });
    mockCommandFacade.commandData.education$.next({ education: [edu] });

    fixture.detectChanges();

    const elements = getElements();
    expect(elements.otherContainer).toBeFalsy();
  });
});
