import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Recipe } from '../../shared/model/recipe';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeServiceService } from '../../shared/Services/recipe-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FontAwesomeModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    FormsModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Uses OnPush change detection strategy for performance optimization
})
export class CardComponent implements OnInit {
  fasFaHeart = fasFaHeart;
  farFaHeart = farFaHeart;
  @Input() recipeData: Recipe[] = [];
  filteredRecipes: Recipe[] = []; // Filtered list of recipes
  searchTerm: string = '';
  constructor(
    private _recipesService: RecipeServiceService,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchRecipes();
    this.filteredRecipes = this.recipeData;

    // Method to fetch recipes from a service or statically
  }

  fetchRecipes(): void {
    this._recipesService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipeData = recipes;
        this.filteredRecipes = [...this.recipeData]; // Clone to filteredRecipes
      },
      error: (error) => console.error('Error fetching recipes:', error),
    });
  }

  filterRecipes(): void {
    if (!this.searchTerm) {
      this.filteredRecipes = [...this.recipeData]; // Show all recipes if search term is cleared
    } else {
      this.filteredRecipes = this.recipeData.filter((recipe) => {
        // Check if the title includes the search term
        const titleMatch = recipe.title
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

        // Safely check if 'ingredients' is an array and if it includes the search term
        const ingredientsMatch =
          Array.isArray(recipe.ingredients) &&
          recipe.ingredients.some(
            (ingredient) =>
              typeof ingredient === 'string' &&
              ingredient.toLowerCase().includes(this.searchTerm.toLowerCase())
          );

        return titleMatch || ingredientsMatch;
      });
    }
  }

  deleteRecipe(id: number): void {
    this._recipesService.deleteRecipe(id).subscribe({
      next: (response) => {
        this.cdRef.markForCheck();

        // Find the index of the deleted recipe in the recipeData array
        const index = this.filteredRecipes.findIndex(
          (recipe) => recipe.id === id
        );
        // If the recipe is found, remove it from the array
        if (index !== -1) {
          this.filteredRecipes.splice(index, 1);
          this.snackBar.open('Recipe deleted successfully!', 'Close', {
            duration: 4000,
          });
        }
        // Optionally, refresh the list or navigate away
      },
      error: (error) => console.error('Error deleting recipe', error),
    });
  }
  toggleFavorite(recipe: any): void {
    recipe.isFavorite = !recipe.isFavorite;
    this._recipesService
      .toggleFavorite(recipe.id, recipe.isFavorite)
      .subscribe({
        next: (response) => {
          this.snackBar.open(
            'Recipe added In Favorites successfully!',
            'Close',
            {
              duration: 4000,
            }
          );
        },
        error: (error) => {
          console.error('Error updating favorite status:', error);

          recipe.isFavorite = !recipe.isFavorite;
        },
      });
  }
}
