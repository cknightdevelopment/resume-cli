import { mergeWith as _mergeWith } from 'lodash';
import { HelpModel } from 'src/app/models/chris/chris-data.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

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
        name: 'command name 1',
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
        name: 'command name 2',
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
