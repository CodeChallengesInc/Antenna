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
  private gameType = 'LoneAnt';

  get ants$(): Observable<SubmissionsResponse[]> {
    return this.antsSubject.asObservable();
  }


  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.refreshAnts();
  }

  private refreshAnts(): void {
    const url = `${environment.submissionApi}/${this.gameType}/submissions`;
    this.httpClient.get<SubmissionsResponse[]>(url).subscribe(ants => {
      ants = ants.sort((a, b) => {
        return a.animalName.localeCompare(b.animalName);
      });
      this.antsSubject.next(ants);
    });
  }

  getRules$(): Observable<any> {
    const url = `${environment.submissionApi}/${this.gameType}`;
    return this.httpClient.get(url, { responseType: 'text' });
  }

  getAnts$(): Observable<SubmissionsResponse[]> {
    const url = `${environment.submissionApi}/${this.gameType}/submissions`;
    return this.httpClient.get<SubmissionsResponse[]>(url);
  }

  getAnt$(name: string, username: string): Observable<PlayerResponse> {
    const url = `${environment.submissionApi}/${this.gameType}/${username}/${name}`;
    return this.httpClient.get<PlayerResponse>(url);
  }

  submitAnt$(animalName: string, submission: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${environment.submissionApi}/${this.gameType}/${this.auth.username}/${animalName}`;
    return this.httpClient.put(url, `"${submission}"`, { headers }).pipe(tap(() => this.refreshAnts()));
  }

  deleteAnt$(name: string): Observable<any> {
    const url = `${environment.submissionApi}/${this.gameType}/${this.auth.username}/${name}`;
    return this.httpClient.delete(url).pipe(tap(() => this.refreshAnts()));
  }
}
