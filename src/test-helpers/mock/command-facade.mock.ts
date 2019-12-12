import { Subject } from 'rxjs';
import { RandomCommandExecuted } from 'src/app/models/command/executed/random-command-executed.model';
import { InitializedCommand } from 'src/app/cli/store/command/command.reducers';

export class MockCommandFacade {
  initializedCommand$ = new Subject<InitializedCommand>();
  history$ = new Subject<InitializedCommand[]>();
  commandData = {
    random$: new Subject<RandomCommandExecuted>()
  };

  dispatch() {}
}
