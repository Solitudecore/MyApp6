export type MovieTag =
  | "2D"
  | "3D"
  | "IMAX"
  | "4D"
  | "Dolby Cinema"
  | "ScreenX"
  | "4DX"
  | "VIP"
  | "Subtitled"
  | "Dubbed";

export type MovieGenre =
  | "Action"
  | "Comedy"
  | "Drama"
  | "Sci-Fi"
  | "Horror"
  | "Adventure"
  | "Thriller"
  | "Romance"
  | "Animation"
  | "Fantasy"
  | "Crime"
  | "Mystery"
  | "Documentary"
  | "Musical"
  | "War"
  | "Western"
  | "Historical"
  | "Biography"
  | "Family"
  | "Sport"
  | "Political"
  | "Psychological"
  | "Supernatural"
  | "Disaster"
  | "Experimental"
  | "Romantic Comedy"
  | "Action Comedy"
  | "Science Fiction"
  | "Romantic Drama"
  | "Action Thriller"
  | "Romantic Thriller"
  | "Action Adventure";

export interface Movie {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: MovieTag[];
  genres: MovieGenre[];
  imdbRating: number;
  duration: string;
  rotten: number;
}
