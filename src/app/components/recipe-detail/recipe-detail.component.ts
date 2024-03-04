import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../../shared/Services/recipe-service.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../shared/model/recipe';
import { Observable, catchError, filter, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  detailRecipeData$!: Observable<Recipe | null>; // Declare an Observable to hold the recipe data

  constructor(
    private _recipesService: RecipeServiceService, // Inject the recipe service for data fetching
    private activatedRoute: ActivatedRoute // Inject ActivatedRoute to access route parameters
  ) {}

  ngOnInit(): void {
    // Initialize detailRecipeData$ to fetch recipe details based on the route parameter 'id'
    this.detailRecipeData$ = this.activatedRoute.paramMap.pipe(
      map((params) => params.get('id')), // Extract 'id' from route parameters
      filter((id) => id !== null), // Filter out null values to ensure 'id' is valid
      map((id) => Number(id)), // Convert 'id' from string to number
      filter((id) => !isNaN(id)), // Check conversion result to ensure 'id' is a valid number
      switchMap((id) =>
        // Use the id to fetch recipe details, handling any errors gracefully
        this._recipesService.getRecipeById(id).pipe(
          catchError((error) => {
            console.error('Error fetching recipe by ID:', error);
            return of(null); // In case of error, return null to handle gracefully
          })
        )
      )
    );
  }
}
