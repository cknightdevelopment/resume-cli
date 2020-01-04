import { RandomCommandComponent } from 'src/app/cli/commands/random-command/random-command.component';
import { UnknownCommandComponent } from 'src/app/cli/commands/unknown-command/unknown-command.component';
import { MissingParameterComponent } from 'src/app/cli/commands/missing-parameter/missing-parameter.component';
import { UnknownParameterComponent } from 'src/app/cli/commands/unknown-parameter/unknown-parameter.component';
import { InvalidArgumentComponent } from 'src/app/cli/commands/invalid-argument/invalid-argument.component';
import { InvalidParameterComponent } from 'src/app/cli/commands/invalid-parameter/invalid-parameter.component';
import { UnknownCliComponent } from 'src/app/cli/commands/unknown-cli/unknown-cli.component';
import { HelpComponent } from 'src/app/cli/commands/help/help.component';
import { EducationComponent } from 'src/app/cli/commands/education/education.component';
import { SkillsComponent } from 'src/app/cli/commands/skills/skills.component';
import { LinksComponent } from 'src/app/cli/commands/links/links.component';
import { WorkHistoryComponent } from 'src/app/cli/commands/work-history/work-history.component';
import { IssueComponent } from 'src/app/cli/commands/issue/issue.component';
import { ContactComponent } from 'src/app/cli/commands/contact/contact.component';

export type CommandComponentTypes = RandomCommandComponent
  | UnknownCommandComponent
  | UnknownParameterComponent
  | MissingParameterComponent
  | InvalidParameterComponent
  | InvalidArgumentComponent
  | UnknownCliComponent
  | HelpComponent
  | EducationComponent
  | SkillsComponent
  | LinksComponent
  | WorkHistoryComponent
  | IssueComponent
  | ContactComponent;
