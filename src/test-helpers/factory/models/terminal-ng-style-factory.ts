import { mergeWith as _mergeWith } from 'lodash';
import { TerminalNgStyle } from 'src/app/models/terminal-ng-style.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function terminalNgStyle(override?: Partial<TerminalNgStyle>): TerminalNgStyle {
  return _mergeWith({
    'background-color': 'black',
    color: 'white',
    'caret-color': 'white',
    'font-family': 'Arial',
    'font-size': '15px'
  } as TerminalNgStyle, override, replaceArrayCustomizer);
}
