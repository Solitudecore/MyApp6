import { createContext, useContext, useState, type ReactNode } from "react";

import type { Movie } from "../types/Movie";
import { movies as initialMovies } from "../data/movies";

interface MovieContextType {
  movies: Movie[];
  savedMovieIds: string[];

  addMovie: (movie: Movie) => void;
  toggleSaved: (movieId: string) => void;
  deleteMovie: (movieId: string) => void;
  updateMovie: (updatedMovie: Movie) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const [savedMovieIds, setSavedMovieIds] = useState<string[]>([]);

  const addMovie = (movie: Movie) => {
    setMovies((previousMovies) => [...previousMovies, movie]);
  };

  const toggleSaved = (movieId: string) => {
    setSavedMovieIds((previousIds) => {
      if (previousIds.includes(movieId)) {
        return previousIds.filter((id) => id !== movieId);
      }

      return [...previousIds, movieId];
    });
  };

  const deleteMovie = (movieId: string) => {
    setMovies((previousMovies) =>
      previousMovies.filter((movie) => movie.id !== movieId),
    );

    setSavedMovieIds((previousIds) =>
      previousIds.filter((id) => id !== movieId),
    );
  };

  const updateMovie = (updatedMovie: Movie) => {
    setMovies((previousMovies) =>
      previousMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie,
      ),
    );
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        savedMovieIds,
        addMovie,
        toggleSaved,
        deleteMovie,
        updateMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovies must be used inside MovieProvider");
  }

  return context;
};
