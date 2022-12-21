import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-edit-game.component.ts',
  template: `
   <h2 class="text-center m-5">Edit an Game</h2>
   <app-game-form [initialState]="game" (formSubmitted)="editGame($event)"></app-game-form>
 `
})
export class EditGameComponent implements OnInit {
  game: BehaviorSubject<Game> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.gameService.getGame(id!).subscribe((game) => {
      this.game.next(game);
    });
  }

  editGame(game: Game) {
    this.gameService.updateGame(this.game.value._id || '', game)
      .subscribe({
        next: () => {
          this.router.navigate(['/games']);
        },
        error: (error) => {
          alert('Failed to update game');
          console.error(error);
        }
      })
  }
}
