import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayerResponse } from '../models/player';
import { SubmissionsResponse } from '../models/submissions';
import { tap } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private antsSubject = new BehaviorSubject<SubmissionsResponse[]>([]);

  get ants$(): Observable<SubmissionsResponse[]> {
    return this.antsSubject.asObservable();
  }

  constructor(private httpClient: HttpClient, private appConfig: AppConfigService) {
    this.refreshAnts();
  }

  private refreshAnts(): void {
    const url = `${this.appConfig.config.submissionApi}/lone-ant/submissions`;
    this.httpClient.get<SubmissionsResponse[]>(url).subscribe(ants => {
      ants = ants.sort((a, b) => {
        return a.username.localeCompare(b.username);
      });
      this.antsSubject.next(ants);
    });
  }

  getRules$(): Observable<any> {
    const url = `${this.appConfig.config.submissionApi}/lone-ant`;
    return this.httpClient.get(url, { responseType: 'text' });
  }

  getAnts$(): Observable<SubmissionsResponse[]> {
    const url = `${this.appConfig.config.submissionApi}/lone-ant/submissions`;
    return this.httpClient.get<SubmissionsResponse[]>(url);
  }

  getAnt$(name: string): Observable<PlayerResponse> {
    const url = `${this.appConfig.config.submissionApi}/lone-ant/${name}`;
    return this.httpClient.get<PlayerResponse>(url);
  }

  submitAnt$(name: string, submission: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.appConfig.config.submissionApi}/lone-ant/${name}`;
    return this.httpClient.put(url, `"${submission}"`, { headers }).pipe(tap(() => this.refreshAnts()));
  }

  deleteAnt$(name: string): Observable<any> {
    const url = `${this.appConfig.config.submissionApi}/lone-ant/${name}`;
    return this.httpClient.delete(url).pipe(tap(() => this.refreshAnts()));
  }
}
