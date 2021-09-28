import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Job {
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages?: Array<string>;
  tools?: Array<string>;
}

export type Jobs = Array<Job>

@Injectable({
  providedIn: 'root'
})
export class JobsProviderService {

  constructor(private http: HttpClient) {
  }

  getJobs(): Observable<Jobs> {
    return this.http.get<Jobs>(`${environment.apiUrl}/jobs`);
  }

  addJob(job: Job) {
    return this.http.post(`${environment.apiUrl}/jobs`, job);
  }
}
