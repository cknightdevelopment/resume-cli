import { CommandNames } from './command-names.model';

describe('CommandNames', () => {
  it('should have all command names be lower case', () => {
    const commandNames = [] as string[];

    for (const cn in CommandNames) {
      if (isNaN(Number(cn))) {
        commandNames.push(CommandNames[cn]);
      }
    }

    commandNames.forEach(x => {
      for (let i = 0; i < x.length; i++) {
        const char = x.charAt(i);
        expect(char).toEqual(char.toLowerCase());
      }
    });
  });
});
