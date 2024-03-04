import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  // Base URL for the API endpoint, pointing to the 'Recipes' collection in your JSON Server
  private baseUrl = 'http://localhost:3000/Recipes';

  constructor(private http: HttpClient) {}

  // Fetches all recipes from the server. Returns an Observable of an array of Recipe objects.
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}`);
  }

  // Fetches a single recipe by its ID. Returns an Observable of a Recipe object.
  getRecipeById(id: any): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  // Adds a new recipe to the server. Accepts the recipe data to be added.
  // Returns an Observable of the newly created Recipe object.
  addRecipe(recipeData: any): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, recipeData);
  }

  // Updates an existing recipe on the server. Accepts the recipe's ID and the updated recipe data.
  // Returns an Observable of the updated Recipe object.
  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/${recipe.id}`, recipe);
  }

  // Deletes a recipe from the server by its ID. Returns an Observable of the deleted Recipe object.
  deleteRecipe(id: number): Observable<Recipe> {
    console.log(id, 'id'); // Logs the ID for debugging purposes
    return this.http.delete<Recipe>(`${this.baseUrl}/${id}`);
  }

  // Toggles the favorite status of a recipe. Accepts the recipe's ID and the new favorite status.
  // Returns an Observable of the response from the server, typically including the updated Recipe object.
  toggleFavorite(recipeId: number, isFavorite: boolean): Observable<any> {
    const url = `${this.baseUrl}/${recipeId}`;
    return this.http.patch(url, { isFavorite: isFavorite });
  }
}
