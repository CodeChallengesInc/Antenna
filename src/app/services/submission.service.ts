import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayerResponse } from '../models/player';
import { SubmissionsResponse } from '../models/submissions';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private antsSubject = new BehaviorSubject<SubmissionsResponse[]>([]);

  get ants$(): Observable<SubmissionsResponse[]> {
    return this.antsSubject.asObservable();
  }

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.refreshAnts();
  }

  private refreshAnts(): void {
    const url = `${environment.submissionApi}/lone-ant/submissions`;
    this.httpClient.get<SubmissionsResponse[]>(url).subscribe(ants => {
      ants = ants.sort((a, b) => {
        return a.antName.localeCompare(b.antName);
      });
      this.antsSubject.next(ants);
    });
  }

  getRules$(): Observable<any> {
    const url = `${environment.submissionApi}/lone-ant`;
    return this.httpClient.get(url, { responseType: 'text' });
  }

  getAnts$(): Observable<SubmissionsResponse[]> {
    const url = `${environment.submissionApi}/lone-ant/submissions`;
    return this.httpClient.get<SubmissionsResponse[]>(url);
  }

  getAnt$(name: string, username: string): Observable<PlayerResponse> {
    const url = `${environment.submissionApi}/lone-ant/${username}/${name}`;
    return this.httpClient.get<PlayerResponse>(url);
  }

  submitAnt$(antName: string, submission: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${environment.submissionApi}/lone-ant/${this.auth.username}/${antName}`;
    return this.httpClient.put(url, `"${submission}"`, { headers }).pipe(tap(() => this.refreshAnts()));
  }

  deleteAnt$(name: string): Observable<any> {
    const url = `${environment.submissionApi}/lone-ant/${this.auth.username}/${name}`;
    return this.httpClient.delete(url).pipe(tap(() => this.refreshAnts()));
  }
}
