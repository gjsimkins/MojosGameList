import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add-game',
  template: `
   <h2 class="text-center m-5">Add a New Game</h2>
   <app-game-form (formSubmitted)="addGame($event)"></app-game-form>
 `
})
export class AddGameComponent {
  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  addGame(game: Game) {
    this.gameService.createGame(game)
      .subscribe({
        next: () => {
          this.router.navigate(['/games']);
        },
        error: (error) => {
          alert("Failed to create game");
          console.error(error);
        }
      });
  }
}