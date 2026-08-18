import axios from "axios";
import type { Movie } from "../types/movie";

export default async function fetchMovies(query: string): Promise<Movie[]> {
    try {
        const response = await axios.get(
            'https://api.themoviedb.org/3/search/movie',
            {
                params: {
                    query: query,
                    language: 'en-US'
                },
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                }
            }
        );
        return response.data.results as Movie[];
    } catch (error) {
        console.error(error);
        return [];
    }
}
