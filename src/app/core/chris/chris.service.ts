import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChrisService {
  constructor() {
  }

  getFacts(): Observable<string[]> {
    return of([
      'Chris does Crossfit.' ,
      'Chris went to music school for bass guitar.' ,
      'Chris loves stand up comedy.' ,
    ]);
  }

  // getRandomFacts(facts: Fact[])  {
  //   const result: Fact[] = [];

  //   for (let i = 0; i < 3; i++) {
  //     const idx = Math.floor(Math.random() * facts.length);
  //     result.push(...facts.splice(idx, 1));
  //   }

  //   return result;
  // }
}
