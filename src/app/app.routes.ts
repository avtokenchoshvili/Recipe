import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', title: 'Home', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent }, // Redirect empty path to '/home'

  {
    path: 'recipe',
    title: 'Recipe',
    component: RecipeComponent,
  },
  {
    path: 'recipe/:id',
    title: 'Details',
    component: RecipeDetailComponent,
  },

  {
    path: 'add-recipe',
    title: 'Add Recipe',
    component: AddRecipeComponent,
  },
  { path: 'edit-recipe/:id', component: AddRecipeComponent },
  { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];
