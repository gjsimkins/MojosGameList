import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = 'http://localhost:5200';
  private games$: Subject<Game[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshGames() {
    this.httpClient.get<Game[]>(`${this.url}/games`)
      .subscribe(games => {
        this.games$.next(games);
      });
  }

  getGames(): Subject<Game[]> {
    this.refreshGames();
    return this.games$;
  }

  getGame(id: string): Observable<Game> {
    return this.httpClient.get<Game>(`${this.url}/games/${id}`);
  }

  createGame(game: Game): Observable<string> {
    return this.httpClient.post(`${this.url}/games`, game, { responseType: 'text' });
  }

  updateGame(id: string, game: Game): Observable<string> {
    return this.httpClient.put(`${this.url}/games/${id}`, game, { responseType: 'text' });
  }

  deleteGame(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/games/${id}`, { responseType: 'text' });
  }
}