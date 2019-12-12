import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ChrisService } from './chris.service';
import { environment } from 'src/environments/environment';
import { ChrisDataModel } from 'src/app/models/chris/chris-data.model';

describe('ChrisService', () => {
  let chrisSvc: ChrisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ChrisService
      ]
    });

    chrisSvc = TestBed.get(ChrisService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(chrisSvc).toBeTruthy();
  });

  it('should get data from local JSON file', () => {
    const response = { facts: ['Fact1', 'Fact2'] } as ChrisDataModel;

    chrisSvc.getData().subscribe(data => expect(data).toEqual(response));

    const req = httpMock.expectOne(environment.dataFile);
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });
});
