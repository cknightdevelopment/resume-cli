import { TerminalActionTypes, TerminalAction } from './terminal.actions';

export interface TerminalState {
  settings: TerminalSettings;
}

export interface TerminalSettings {
  backgroundColor: string;
  fontSize: string;
  fontFamily: string;
  color: string;
}

export const intitalState: TerminalState = {
  settings: {
    backgroundColor: 'black',
    fontSize: '15px',
    fontFamily: '"Courier New", Courier, monospace',
    color: 'white'
  }
};

export function reducer(state = intitalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case TerminalActionTypes.SettingsUpdated:
      return {
        ...state,
        settings: {
          ...Object.assign({}, state.settings, action.payload)
        }
      };
    default: {
      return state;
    }
  }
}
