import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';
import { TestModule } from 'src/test-helpers/test.modules';
import { CommandFacade } from '../../store/command/command.facade';
import { MockCommandFacade } from 'src/test-helpers/mock/command-facade.mock';
import { ChangeDetectionStrategy } from '@angular/core';
import { HelpExecuted } from '../../store/command/command.actions';
import { By } from '@angular/platform-browser';
import { SELECTORS } from 'src/test-helpers/common-selectors';
import { helpModel } from 'src/test-helpers/factory/models';
import { CONSTANTS } from 'src/app/models/constants';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let dispatchSpy: jasmine.Spy;
  let mockCommandFacade: MockCommandFacade;

  function getElements() {
    const output = fixture.debugElement.query(By.css(`${SELECTORS.TERMINAL_OUTPUT}`));

    return {
      output,
      links: !output ? null : {
        buildStatus: output.query(By.css('.help-links :first-child')),
        coverageStatus: output.query(By.css('.help-links :nth-child(2)')),
        sourceCode: output.query(By.css('.help-links :nth-child(3)')),
      },
      commands: !output ? null : output.queryAll(By.css('.commands-help-container .command-help-container')).map(commandHelp => {
        return {
          name: commandHelp.query(By.css('.command-help--name')),
          description: commandHelp.query(By.css('.command-help--description > span')),
          arguments: commandHelp.queryAll(By.css('.arguments-help-container .argument-help')).map(argumentHelp => {
            return {
              name: argumentHelp.query(By.css('.argument-help--name')),
              description: argumentHelp.query(By.css('.argument-help--description')),
            };
          })
        };
      })
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: CommandFacade, useClass: MockCommandFacade }
      ],
      declarations: [HelpComponent]
    }).overrideComponent(HelpComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;

    component.params = {};
    mockCommandFacade = TestBed.get(CommandFacade);
    dispatchSpy = spyOn(mockCommandFacade, 'dispatch');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch help execution', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(new HelpExecuted(component.params));
  });

  it('should display help links', () => {
    const help = helpModel();

    mockCommandFacade.commandData.help$.next({ help });
    fixture.detectChanges();

    const elements = getElements();

    expect(elements.links.buildStatus.nativeElement.getAttribute('href')).toEqual(help.buildStatus.linkUrl);
    const buildStatusImg = elements.links.buildStatus.query(By.css('img'));
    expect(buildStatusImg.nativeElement.getAttribute('src')).toEqual(help.buildStatus.imgUrl);
    expect(buildStatusImg.nativeElement.getAttribute('alt')).toEqual('Build Status');

    expect(elements.links.coverageStatus.nativeElement.getAttribute('href')).toEqual(help.coverageStatus.linkUrl);
    const coverageStatusImg = elements.links.coverageStatus.query(By.css('img'));
    expect(coverageStatusImg.nativeElement.getAttribute('src')).toEqual(help.coverageStatus.imgUrl);
    expect(coverageStatusImg.nativeElement.getAttribute('alt')).toEqual('Coverage Status');

    expect(elements.links.sourceCode.nativeElement.getAttribute('href')).toEqual(help.sourceCodeUrl);
    expect(elements.links.sourceCode.nativeElement.innerText).toEqual('View Source Code');
    const sourceCodeIconClasses = elements.links.sourceCode.query(By.css('i')).nativeElement.classList;
    expect(sourceCodeIconClasses).toContain('fab');
    expect(sourceCodeIconClasses).toContain('fa-github');
  });

  it('should display help when no data provided', () => {
    mockCommandFacade.commandData.help$.next({ help: null });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.output).toBeFalsy();
  });

  it('should display command help info', () => {
    const help = helpModel();

    mockCommandFacade.commandData.help$.next({ help });
    fixture.detectChanges();

    const elements = getElements();
    elements.commands.forEach((command, commandi) => {
      expect(command.name.nativeElement.innerText).toEqual(help.commands[commandi].name);
      expect(command.description.nativeElement.innerText).toEqual(help.commands[commandi].description);
    });
  });

  it('should display commands help info when no commands provided', () => {
    const help = helpModel({ commands: null });

    mockCommandFacade.commandData.help$.next({ help });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.commands.length).toEqual(0);
  });

  it('should display commands in alphabetical order', () => {
    const help = helpModel({
      commands: [
        { name: 'Z', description: 'test' },
        { name: 'Y', description: 'test' },
        { name: 'X', description: 'test' },
      ]
    });

    mockCommandFacade.commandData.help$.next({ help });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.commands[0].name.nativeNode.innerText).toEqual('X');
    expect(elements.commands[1].name.nativeNode.innerText).toEqual('Y');
    expect(elements.commands[2].name.nativeNode.innerText).toEqual('Z');
  });

  it('should display command argument(s) help info', () => {
    const help = helpModel();

    mockCommandFacade.commandData.help$.next({ help });
    fixture.detectChanges();

    const elements = getElements();
    elements.commands.forEach((command, commandi) => {
      command.arguments.forEach((argument, argumenti) => {
        const argumentData = help.commands[commandi].arguments[argumenti];
        expect(argument.name.nativeElement.innerText).toEqual(`${CONSTANTS.COMMAND.PARAM_PREFIX}${argumentData.name}`);

        // see helpModel() for how argument data is set to support these checks by index
        if (argumenti === 0) {
          expect(argument.description.nativeElement.innerText).toEqual(`${argumentData.description} (optional)`);
        } else if (argumenti === 1) {
          expect(argument.description.nativeElement.innerText)
            .toEqual(`${argumentData.description} (required, default=${argumentData.default})`);
        }
      });
    });
  });

  it('should display command arguments in alphabetical order', () => {
    const help = helpModel({
      commands: [
        {
          name: 'test',
          description: 'test',
          arguments: [
            { name: 'Z', description: 'test' },
            { name: 'Y', description: 'test' },
            { name: 'X', description: 'test' },
          ]
        }
      ]
    });

    mockCommandFacade.commandData.help$.next({ help });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.commands[0].arguments[0].name.nativeNode.innerText).toEqual(`${CONSTANTS.COMMAND.PARAM_PREFIX}X`);
    expect(elements.commands[0].arguments[1].name.nativeNode.innerText).toEqual(`${CONSTANTS.COMMAND.PARAM_PREFIX}Y`);
    expect(elements.commands[0].arguments[2].name.nativeNode.innerText).toEqual(`${CONSTANTS.COMMAND.PARAM_PREFIX}Z`);
  });

  it('should display command arguments help info when no arguments provided', () => {
    const help = helpModel({
      commands: [
        { name: 'test', description: '', arguments: null }
      ]
    });

    mockCommandFacade.commandData.help$.next({ help });
    fixture.detectChanges();

    const elements = getElements();
    expect(elements.commands[0].arguments.length).toEqual(0);
  });
});
