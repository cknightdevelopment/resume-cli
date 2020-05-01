import { ReplaySubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { HelpModel } from 'src/app/models/resume/resume-data.model';
import { ResumeFacade } from '../store/resume/resume.facade';
import { ResumeDataLoadedResolver } from './resume-data-loaded.resolver';

class MockResumeFacade {
  help$ = new ReplaySubject<HelpModel>(1);
}

describe('ResumeDataLoadedResolver', () => {
  let resolver: ResumeDataLoadedResolver;
  let resumeFacade: MockResumeFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResumeDataLoadedResolver,
        { provide: ResumeFacade, useClass: MockResumeFacade }
      ],
    });

    resolver = TestBed.get(ResumeDataLoadedResolver);
    resumeFacade = TestBed.get(ResumeFacade);
  });

  it('should resolve and complete subscription once help data is available', () => {
    const resolve$ = resolver.resolve(null, null);
    const expected = cold('(a|)', { a: true });
    resumeFacade.help$.next({ commands: [{ name: 'name', description: 'description' }] });

    expect(resolve$).toBeObservable(expected);
  });

  it('should not resolve if no help data available', () => {
    const resolve$ = resolver.resolve(null, null);
    const expected = cold('-');

    expect(resolve$).toBeObservable(expected);
  });
});
