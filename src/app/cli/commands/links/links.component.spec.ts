import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { By } from '@angular/platform-browser';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { TestModule } from 'src/test-helpers/test.modules';
import { CommandFacade } from '../../store/command/command.facade';
import { ChangeDetectionStrategy } from '@angular/core';
import { LinksExecuted } from '../../store/command/command.actions';
import { LinksComponent } from './links.component';
import { linkModel } from 'src/test-helpers/factory/models';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;
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
      declarations: [LinksComponent]
    }).overrideComponent(LinksComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;

    component.params = {};
    mockCommandFacade = TestBed.get(CommandFacade);
    dispatchSpy = spyOn(mockCommandFacade, 'dispatch');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch links execution', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(new LinksExecuted(component.params));
  });

  it('should display output for links', () => {
    const links = [
      linkModel({ iconClass: 'icon1', title: 'title1', url: 'url1' }),
      linkModel({ iconClass: 'icon2', title: 'title2', url: 'url2' })
    ];

    mockCommandFacade.commandData.links$.next({ links });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.length).toEqual(2);
    elements.forEach((x, i) => {
      expect(x.icon.nativeElement.classList).toContain(links[i].iconClass);
      expect(x.link.nativeElement.getAttribute('href')).toEqual(links[i].url);
      expect(x.link.nativeElement.innerText).toEqual(links[i].title);
    });
  });
});
