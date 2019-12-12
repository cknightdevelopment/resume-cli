import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChrisDataModel } from 'src/app/models/chris/chris-data.model';

@Injectable({
  providedIn: 'root'
})
export class ChrisService {
  constructor(private http: HttpClient) {
  }

  getData(): Observable<ChrisDataModel> {
    return this.http.get<ChrisDataModel>(environment.dataFile);
  }
}
