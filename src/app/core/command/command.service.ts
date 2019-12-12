import { Injectable } from '@angular/core';
import { getRandomArrayIndex } from 'src/app/util';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  constructor() { }

  public getRandomFacts(count: number, allFacts: string[], usedFacts: string[]): string[] {
    // create copies of the arrays
    allFacts = allFacts.slice();
    usedFacts = usedFacts.slice();

    const result = [] as string[];
    const unusedFacts = allFacts.filter(fact => !usedFacts.includes(fact));

    let countNeeded = count;
    let factsToLoop = unusedFacts;

    // if count is more than the remaining unused facts
    if (count >= unusedFacts.length) {
      result.push(...unusedFacts);

      // see how many more facts we are needing
      countNeeded = count - unusedFacts.length;

      // use the used facts (since we have already exhausted the unused list)
      factsToLoop = usedFacts;
    }

    for (let i = 0; i < countNeeded; i++) {
      if (!factsToLoop || !factsToLoop.length) {
        break;
      }

      const randomIndex = getRandomArrayIndex(factsToLoop);
      const randomFact = factsToLoop.splice(randomIndex, 1)[0];
      result.push(randomFact);
    }

    return result;
  }
}
