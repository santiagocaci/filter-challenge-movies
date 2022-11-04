import axios from 'axios';
import { MoviesResponse } from '../types';

type DefaultParams = {
  page?: number;
  region?: string;
  language?: string;
};

const theMovieDBInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_THEMOVIEDB_KEY,
  },
  transformResponse: [
    function (data) {
      const dataParse: MoviesResponse = JSON.parse(data);
      dataParse.results.forEach(movie => {
        movie.poster_path =
          'https://image.tmdb.org/t/p/original' + movie.poster_path;
        movie.backdrop_path =
          'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
      });

      return { ...dataParse };
    },
  ],
});

export const getTopRatedMovies = async (
  { page, region, language }: DefaultParams = {
    page: 1,
    region: 'AR',
    language: 'es-AR',
  }
) => {
  try {
    const { data } = await theMovieDBInstance.get<MoviesResponse>(
      '/movie/top_rated',
      {
        params: {
          page,
          region,
          language,
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return error.message;
    } else {
      console.log('Unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
};

export const getDiscoverMovies = async (
  { page, region, language, sortBy }: DefaultParams & { sortBy?: string } = {
    page: 1,
    region: 'AR',
    language: 'es-AR',
    sortBy: 'popularity.desc',
  }
) => {
  const { data } = await theMovieDBInstance.get<MoviesResponse>(
    '/discover/movie',
    {
      params: {
        page,
        region,
        language,
        sort_by: sortBy,
      },
    }
  );
  return data;
};

export const getPopularMovies = async (
  { page, language, region }: DefaultParams = {
    page: 1,
    region: 'AR',
    language: 'es-AR',
  }
) => {
  try {
    const { data } = await theMovieDBInstance.get<MoviesResponse>(
      '/movie/popular',
      {
        params: {
          region,
          page,
          language,
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return error.message;
    } else {
      console.log('Unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
};
