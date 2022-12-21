import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../game';

@Component({
  selector: 'app-game-form',
  template: `
   <form class="game-form" autocomplete="off" [formGroup]="gameForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="title" formControlName="title" placeholder="Title" required>
       <label for="title">Title</label>
     </div>
 
     <div *ngIf="title.invalid && (title.dirty || title.touched)" class="alert alert-danger">
       <div *ngIf="title.errors?.['required']">
         Title is required.
       </div>
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="platforms" placeholder="Platforms">
       <label for="platforms">Platforms</label>
     </div>
 
     <div *ngIf="platforms.invalid && (platforms.dirty || platforms.touched)" class="alert alert-danger">
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="number" id="rating" formControlName="rating" placeholder="Rating" required>
       <label for="rating">Rating</label>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="gameForm.invalid">Add</button>
   </form>
 `,
  styles: [
    `.game-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
  ]
})
export class GameFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Game> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Game>();

  @Output()
  formSubmitted = new EventEmitter<Game>();

  gameForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get title() { return this.gameForm.get('title')!; }
  get platforms() { return this.gameForm.get('platforms')!; }
  get rating() { return this.gameForm.get('rating')!; }

  ngOnInit() {
    this.initialState.subscribe(game => {
      this.gameForm = this.fb.group({
        title: [game.title, [Validators.required]],
        platforms: [game.platforms, []],
        rating: [game.rating, [Validators.required]]
      });
    });

    this.gameForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.gameForm.value);
  }
}