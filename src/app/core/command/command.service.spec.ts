import { TestBed } from '@angular/core/testing';

import { CommandService } from './command.service';

describe('CommandService', () => {
  let commandSvc: CommandService;

  function getUniqueValues(array: any[]) {
    return [...new Set(array)];
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandService,
      ]
    });

    commandSvc = TestBed.get(CommandService);
  });

  it('should be created', () => {
    expect(commandSvc).toBeTruthy();
  });

  it('should return unique random facts', () => {
    const all = ['a', 'b', 'c'];
    const used = [];
    const result = commandSvc.getRandomFacts(2, all, used);

    expect(getUniqueValues(result).length).toEqual(2);
    expect(all.includes(result[0])).toBeTruthy();
    expect(all.includes(result[1])).toBeTruthy();
  });

  it('should return all facts when count same as all length', () => {
    const all = ['a', 'b', 'c'];
    const used = [];
    const result = commandSvc.getRandomFacts(all.length, all, used);

    expect(result).toEqual(all);
  });

  it('should return all facts when count is higher than all length', () => {
    const all = ['a', 'b', 'c'];
    const used = [];
    const result = commandSvc.getRandomFacts(all.length + 5, all, used);

    expect(result).toEqual(all);
  });

  it('should return unused facts when count is less or equal to unused length', () => {
    const all = ['a', 'b', 'c'];
    const used = ['b'];
    const result = commandSvc.getRandomFacts(2, all, used);

    expect(result.includes('a')).toBeTruthy();
    expect(result.includes('c')).toBeTruthy();
  });

  it('should return all unused facts and then pull from used facts when count is greater than unused length', () => {
    const all = ['a', 'b', 'c'];
    const used = ['a', 'b'];
    const result = commandSvc.getRandomFacts(2, all, used);

    expect(getUniqueValues(result).length).toEqual(2);
    expect(result.includes('c')).toBeTruthy();
    expect(result.includes('a') || result.includes('b')).toBeTruthy();
  });
});
