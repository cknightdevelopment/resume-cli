import { mergeWith as _mergeWith } from 'lodash';
import { HelpModel } from 'src/app/models/resume/resume-data.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';
import { CommandNames } from 'src/app/models/command/command-names.model';

export function helpModel(override?: Partial<HelpModel>): HelpModel {
  return _mergeWith({
    sourceCodeUrl: 'http://sourceCodeUrl',
    buildStatus: {
      imgUrl: 'http://imgUrl',
      linkUrl: 'http://linkUrl'
    },
    coverageStatus: {
      imgUrl: 'http://imgUrl',
      linkUrl: 'http://linkUrl'
    },
    commands: [
      {
        name: CommandNames.Random,
        description: 'command description 1',
        arguments: [
          {
            name: 'argument name 1.1',
            description: 'argument description 1.1',
            required: false
          },
          {
            name: 'argument name 1.2',
            description: 'argument description 1.2',
            required: true,
            default: 'defaultvalue'
          }
        ]
      },
      {
        name: CommandNames.WorkHistory,
        description: 'command description 2',
        arguments: [
          {
            name: 'argument name 2.1',
            description: 'argument description 2.1',
            required: false
          },
          {
            name: 'argument name 2.2',
            description: 'argument description 2.2',
            required: true,
            default: 'defaultvalue'
          }
        ]
      }
    ]
  } as HelpModel, override, replaceArrayCustomizer);
}
