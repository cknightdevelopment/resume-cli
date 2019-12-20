import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
        logo: output.query(By.css('.college img')),
        location: output.query(By.css('.college--location')),
        dates: output.query(By.css('.college--dates')),
        highlights: output.queryAll(By.css('.college--highlights li')),
        other: output.queryAll(By.css('.college--other ul li')),
      }
      : null;
  }

  beforeEach(async(() => {
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
    mockCommandFacade = TestBed.get(CommandFacade);
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
    mockCommandFacade.commandData.education$.next(edu);

    fixture.detectChanges();

    const elements = getElements();
    expect(elements.logo.nativeElement.getAttribute('src')).toEqual(edu.college.logo);
    expect(elements.logo.nativeElement.getAttribute('alt')).toEqual(edu.college.name);
    expect(elements.location.nativeElement.innerText).toEqual(edu.college.location);
    expect(elements.dates.nativeElement.innerText).toEqual(`${edu.college.start} - ${edu.college.end}`);
    expect(elements.highlights[0].nativeElement.innerText).toEqual(edu.college.degree);
    edu.college.highlights.forEach((highlight, i) => {
      expect(elements.highlights[i + 1].nativeElement.innerText).toEqual(highlight);
    });
    edu.college.other.forEach((o, i) => {
      expect(elements.other[i].nativeElement.innerText).toEqual(o);
    });
  });
});
