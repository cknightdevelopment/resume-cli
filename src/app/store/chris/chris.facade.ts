import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { Observable } from 'rxjs';
import { ChrisAction } from './chris.actions';
import { selectFacts, selectEducation } from './chris.selectors';
import { EducationModel } from 'src/app/models/chris/chris-data.model';

@Injectable()
export class ChrisFacade {
  facts$: Observable<string[]> = this.store.select(selectFacts);
  education$: Observable<EducationModel> = this.store.select(selectEducation);

  constructor(private store: Store<AppState>) {
  }

  dispatch(action: ChrisAction): void {
    this.store.dispatch(action);
  }
}
