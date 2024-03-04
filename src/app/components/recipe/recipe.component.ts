import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable from RxJS for handling asynchronous data
import { Recipe } from '../../shared/model/recipe'; // Import the Recipe model to type-check the data
import { RecipeServiceService } from '../../shared/Services/recipe-service.service'; // Import the service that fetches recipe data
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { CardComponent } from '../card/card.component'; // Import CardComponent to use in the template

@Component({
  selector: 'app-recipe', // Define the selector for the component
  standalone: true, // Mark the component as standalone for Angular 13+ standalone components feature
  imports: [CommonModule, CardComponent], // Import required modules and components
  templateUrl: './recipe.component.html', // Link to the component's HTML template
  styleUrls: ['./recipe.component.scss'], // Link to the component's styles
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush change detection strategy for performance optimization
})
export class RecipeComponent implements OnInit {
  public recipeData$!: Observable<Recipe[]>; // Declare an observable to hold the recipe data
  @Output() selectRecipe = new EventEmitter<Recipe>(); // Emits the selected recipe data

  constructor(private _recipesService: RecipeServiceService) {} // Inject the recipe service

  ngOnInit(): void {
    this.recipeData$ = this._recipesService.getRecipes(); // Fetch recipes on component initialization and assign the observable
  }
}
