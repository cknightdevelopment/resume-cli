import { merge as _merge } from 'lodash';
import { TerminalNgStyle } from 'src/app/models/terminal-ng-style.model';

export function terminalNgStyle(override?: Partial<TerminalNgStyle>): TerminalNgStyle {
  return _merge({
    'background-color': 'black',
    color: 'white',
    'caret-color': 'white',
    'font-family': 'Arial',
    'font-size': '15px'
  } as TerminalNgStyle, override);
}
