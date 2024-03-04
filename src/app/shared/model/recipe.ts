export interface Recipe {
  id: any;
  title: string;
  shortDescription: string;
  ingredients: string[];
  instructions: string;
  thumbnailImage?: File;
  isFavorite: boolean;
}
