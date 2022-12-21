import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './games-list/games-list.component';
import { AddGameComponent } from './add-game/add-game.component'; // <-- add this line
import { EditGameComponent } from './edit-game/edit-game.component'; // <-- add this line

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', component: GamesListComponent },
  { path: 'games/new', component: AddGameComponent }, // <-- add this line
  { path: 'games/edit/:id', component: EditGameComponent }]; // <-- add this line

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }