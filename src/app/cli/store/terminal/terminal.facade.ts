import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { selectTerminalSettings } from './terminal.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TerminalNgStyle } from 'src/app/models/terminal-ng-style.model';
import { TerminalAction } from './terminal.actions';
import { TerminalSettings } from './terminal.reducers';

@Injectable()
export class TerminalFacade {
  ngStyles$: Observable<TerminalNgStyle> = this.store.select(selectTerminalSettings).pipe(
    map(x => this.mapToNgStyles(x))
  );

  constructor(private store: Store<AppState>) {
  }

  dispatch(action: TerminalAction): void {
    this.store.dispatch(action);
  }

  private mapToNgStyles(terminalSettings: TerminalSettings): TerminalNgStyle {
    return {
      'background-color': terminalSettings.backgroundColor,
      color: terminalSettings.color,
      'font-family': terminalSettings.fontFamily,
      'font-size': terminalSettings.fontSize,
      'caret-color': terminalSettings.color
    };
  }
}
