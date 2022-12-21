import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games-list',
  template: `
   <h2 class="text-center m-5">Games List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Title</th>
               <th>Platforms</th>
               <th>Rating</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let game of games$ | async">
               <td>{{game.title}}</td>
               <td>{{game.platforms}}</td>
               <td>{{game.rating}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', game._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteGame(game._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Game</button>
 `
})
export class GamesListComponent implements OnInit {
  games$: Observable<Game[]> = new Observable();

  constructor(private gamesService: GameService) { }

  ngOnInit(): void {
    this.fetchGames();
  }

  deleteGame(id: string): void {
    this.gamesService.deleteGame(id).subscribe({
      next: () => this.fetchGames()
    });
  }

  private fetchGames(): void {
    this.games$ = this.gamesService.getGames();
  }
}