import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResumeDataModel } from 'src/app/models/resume/resume-data.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient) {
  }

  getData(resumeUrl?: string): Observable<ResumeDataModel> {
    return this.http.get<ResumeDataModel>(resumeUrl || environment.exampleResumeUrl);
  }
}
