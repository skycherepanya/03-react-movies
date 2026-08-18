import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import css from "./App.module.css";

import type { Movie } from "./src/types/movie";
import fetchMovies from "./src/services/movieService";
import SearchBar from "./src/components/SearchBar/SearchBar";
import MovieGrid from "./src/components/MovieGrid/MovieGrid";
import Loader from "./src/components/Loader/Loader";
import ErrorMessage from "./src/components/ErrorMessage/ErrorMessage";
import MovieModal from "./src/components/MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchMovies(query);
      setMovies(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && !isError && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
