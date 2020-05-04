import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommandComponent } from '../command.component';
import { HelpInputParams } from 'src/app/models/command/input/help-input-params.model';
import { HelpExecutedModel } from 'src/app/models/command/executed/help-executed.model';
import { CommandFacade } from '../../store/command/command.facade';
import { HelpExecuted } from '../../store/command/command.actions';
import { filter, take } from 'rxjs/operators';
import { ArgumentHelpModel, CommandHelpModel } from 'src/app/models/resume/resume-data.model';
import { CONSTANTS } from 'src/app/models/constants';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements CommandComponent<HelpInputParams>, OnInit {
  @Input() params: HelpInputParams;
  data: HelpExecutedModel;
  CONSTANTS = CONSTANTS;

  constructor(private facade: CommandFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(new HelpExecuted(this.params));
    this.facade.commandData.help$.pipe(
      filter(x => !!x),
      take(1)
    ).subscribe(x => this.data = x);
  }

  filterCommandsAndSort(data: CommandHelpModel[]) {
    const filtered = (data || []).slice()
      .filter(x => CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS[x.name]);
    return this.sort(filtered) as CommandHelpModel[];
  }

  sort(data: (CommandHelpModel | ArgumentHelpModel)[]) {
    return (data || []).slice()
      .sort((a, b) => a.name > b.name ? 1 : -1);
  }

  secondaryInfo(argument: ArgumentHelpModel) {
    if (!argument) return null;

    let result = `(${argument.required ? 'required' : 'optional'}`;

    if (argument.default) {
      result += `, default=${argument.default}`;
    }

    result += ')';

    return result;
  }
}
