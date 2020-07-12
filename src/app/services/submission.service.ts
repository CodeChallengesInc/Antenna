import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayerResponse } from '../models/player';
import { SubmissionsResponse } from '../models/submissions';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { GameTypeService } from './game-type.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private antsSubject = new BehaviorSubject<SubmissionsResponse[]>([]);

  get ants$(): Observable<SubmissionsResponse[]> {
    return this.antsSubject.asObservable();
  }


  constructor(private httpClient: HttpClient, private auth: AuthService, private gameTypeService: GameTypeService) {
    this.refreshAnts();
  }
  private refreshAnts(): void {
    const url = `${environment.submissionApi}/${this.gameTypeService.currentGameType}/submissions`;
    this.httpClient.get<SubmissionsResponse[]>(url).subscribe(ants => {
      ants = ants.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.antsSubject.next(ants);
    });
  }

  getRules$(): Observable<any> {
    const url = `${environment.submissionApi}/${this.gameTypeService.currentGameType}`;
    return this.httpClient.get(url, { responseType: 'text' });
  }

  getAnts$(): Observable<SubmissionsResponse[]> {
    const url = `${environment.submissionApi}/${this.gameTypeService.currentGameType}/submissions`;
    return this.httpClient.get<SubmissionsResponse[]>(url);
  }

  getAnt$(name: string, username: string): Observable<PlayerResponse> {
    const url = `${environment.submissionApi}/${this.gameTypeService.currentGameType}/${username}/${name}`;
    return this.httpClient.get<PlayerResponse>(url);
  }

  submitAnt$(name: string, submission: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${environment.submissionApi}/${this.gameTypeService.currentGameType}/${this.auth.username}/${name}`;
    return this.httpClient.put(url, `"${btoa(submission)}"`, { headers }).pipe(tap(() => this.refreshAnts()));
  }

  deleteAnt$(name: string): Observable<any> {
    const url = `${environment.submissionApi}/${this.gameTypeService.currentGameType}/${this.auth.username}/${name}`;
    return this.httpClient.delete(url).pipe(tap(() => this.refreshAnts()));
  }
}
