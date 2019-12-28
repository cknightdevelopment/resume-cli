import { Subject } from 'rxjs';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { InitializedCommand } from 'src/app/cli/store/command/command.reducers';
import { EducationExecutedModel } from 'src/app/models/command/executed/education-executed.model';
import { SkillsExecutedModel } from 'src/app/models/command/executed/skills-executed.model';

export class MockCommandFacade {
  initializedCommand$ = new Subject<InitializedCommand>();
  history$ = new Subject<InitializedCommand[]>();
  commandData = {
    random$: new Subject<RandomCommandExecutedModel>(),
    education$: new Subject<EducationExecutedModel>(),
    skills$: new Subject<SkillsExecutedModel>(),
  };

  dispatch() {}
}