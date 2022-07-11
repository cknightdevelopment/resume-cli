import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponent } from './skills.component';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { By } from '@angular/platform-browser';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { TestModule } from 'src/test-helpers/test.modules';
import { CommandFacade } from '../../store/command/command.facade';
import { ChangeDetectionStrategy } from '@angular/core';
import { SkillsExecuted } from '../../store/command/command.actions';
import { skillSetModel } from 'src/test-helpers/factory/models';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    const output = fixture.debugElement.query(By.css(`${SELECTORS.TERMINAL_OUTPUT}`));

    const skillSetContainers = output.queryAll(By.css('.skill-set-container'));

    const result = skillSetContainers.map(ssc => {
      const skillContainers = ssc.queryAll(By.css('.skill-container'));

      return  {
        container: ssc,
        title: ssc.query(By.css('.skill-set-title')),
        skillContainers: skillContainers.map(sc => {
          return {
            container: sc,
            name: sc.query(By.css('.skill-name')),
            ratingItems: sc.queryAll(By.css('.skill-rating-item'))
          };
        })
      };
    });
    return output && result;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
      ],
      declarations: [SkillsComponent]
    }).overrideComponent(SkillsComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;

    component.params = {};
    mockCommandFacade = TestBed.inject(CommandFacade) as any;
    dispatchSpy = spyOn(mockCommandFacade, 'dispatch');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch skills execution', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(new SkillsExecuted(component.params));
  });

  it('should display output for skills', () => {
    const skillSets = [
      skillSetModel({
        title: 'SkillSet1',
        maxRating: 5,
        ratings: [
          { name: 'Rating1.1', rating: 5 }, // all
          { name: 'Rating1.2', rating: 2.5 }, // has a half
          { name: 'Rating1.3', rating: 0 }, // none
        ]
      }),
      skillSetModel({
        title: 'SkillSet2',
        maxRating: 10, // different max
        ratings: [
          { name: 'Rating2.1', rating: 5 }
        ]
      }),
    ];
    mockCommandFacade.commandData.skills$.next({ skills: skillSets });

    fixture.detectChanges();

    const elements = getElements();
    skillSets.forEach((skillSet, skillSetIndex) => {
      const skillSetDE = elements[skillSetIndex];
      expect(skillSetDE.title.nativeElement.innerText).toEqual(skillSet.title);
      skillSet.ratings.forEach((rating, ratingIndex) => {
        const ratingDE = skillSetDE.skillContainers[ratingIndex];
        expect(ratingDE.name.nativeElement.innerText).toEqual(rating.name);
        expect(ratingDE.ratingItems.length).toEqual(skillSet.maxRating);

        if (skillSetIndex === 0) {
          if (ratingIndex === 0) {
            expect(ratingDE.ratingItems[0].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[1].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[2].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[3].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[4].nativeElement.classList).toContain('skill-rating-item--full');
          } else if (ratingIndex === 1) {
            expect(ratingDE.ratingItems[0].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[1].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[2].nativeElement.classList).toContain('skill-rating-item--half');
            expect(ratingDE.ratingItems[3].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[4].nativeElement.classList).toContain('skill-rating-item--empty');
          } else if (ratingIndex === 2) {
            expect(ratingDE.ratingItems[0].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[1].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[2].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[3].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[4].nativeElement.classList).toContain('skill-rating-item--empty');
          }
        } else if (skillSetIndex === 1) {
          if (ratingIndex === 0) {
            expect(ratingDE.ratingItems[0].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[1].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[2].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[3].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[4].nativeElement.classList).toContain('skill-rating-item--full');
            expect(ratingDE.ratingItems[5].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[6].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[7].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[8].nativeElement.classList).toContain('skill-rating-item--empty');
            expect(ratingDE.ratingItems[9].nativeElement.classList).toContain('skill-rating-item--empty');
          }
        }
      });
    });
  });
});
