import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeServiceService } from '../../shared/Services/recipe-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;

  imageBase64: string | ArrayBuffer | null = null;
  constructor(
    private _fb: FormBuilder,
    private _recipesService: RecipeServiceService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
    this.activateRoute.params.subscribe((params) => {
      const recipeId = params['id'];
      if (recipeId) {
        this.loadRecipeData(recipeId);
      }
    });
  }

  private initForm() {
    this.recipeForm = this._fb.group({
      id: [null],
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      thumbnailImage: [null],
    });
  }

  onFileSelected(event: any) {
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageBase64 = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private loadRecipeData(recipeId: any) {
    // Use  service to get the recipe by ID
    this._recipesService.getRecipeById(recipeId).subscribe((recipe) => {
      if (recipe) {
        this.recipeForm.patchValue({
          id: recipe.id,
          title: recipe.title,
          shortDescription: recipe.shortDescription,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        });
        if (recipe.thumbnailImage instanceof File) {
          // Converting File to base64 string
          const reader = new FileReader();
          reader.onload = (e) => {
            // Safely access e.target.result
            if (e.target) {
              this.imageBase64 = e.target.result;
            }
          };
          reader.readAsDataURL(recipe.thumbnailImage);
        } else if (typeof recipe.thumbnailImage === 'string') {
          // Directly assign if it's a string (URL or base64)
          this.imageBase64 = recipe.thumbnailImage;
        } else {
          // Handle null or undefined cases
          this.imageBase64 = null;
        }
      }
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipeData = {
        ...this.recipeForm.value,
        thumbnailImage: this.imageBase64,
      };

      // If an ID is already part of the recipe data, proceed to update
      if (recipeData.id) {
        this._recipesService.updateRecipe(recipeData.id, recipeData).subscribe({
          next: (response) => {
            this.snackBar.open('Recipe updated successfully!', 'Close', {
              duration: 4000,
            });
            this.router.navigate(['/recipe']);
          },
          error: (error) => console.error('Error updating recipe:', error),
        });
      } else {
        // If no ID is provided, fetch existing recipes to calculate the newId
        this._recipesService.getRecipes().subscribe((recipes) => {
          let maxId = 0;
          recipes.forEach((recipe) => {
            const currentId = parseInt(recipe.id, 10);
            if (!isNaN(currentId) && currentId > maxId) {
              maxId = currentId;
            }
          });

          // Calculate newId based on the highest ID found
          const newId = maxId + 1;
          recipeData.id = newId.toString(); // Assign the new, incremented ID

          // Add the new recipe with the newId
          this._recipesService.addRecipe(recipeData).subscribe({
            next: (response) => {
              this.snackBar.open('Recipe added successfully!', 'Close', {
                duration: 4000, // Auto hide after 2000ms
              });
              this.router.navigate(['/recipe']);
            },
            error: (error) => console.error('Error adding new recipe:', error),
          });
        });
      }
    }
  }
}
