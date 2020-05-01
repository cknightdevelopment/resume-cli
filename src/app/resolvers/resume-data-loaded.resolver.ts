import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ResumeFacade } from '../store/resume/resume.facade';

@Injectable({ providedIn: 'root' })
export class ResumeDataLoadedResolver implements Resolve<boolean> {
  constructor(private resumeFacade: ResumeFacade) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.resumeFacade.help$.pipe(
      filter(x => x && x.commands && !!x.commands.length),
      take(1),
      map(() => true)
    );
  }
}
