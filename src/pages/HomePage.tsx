import { useQuery } from '@tanstack/react-query';
import { theMovieDBApi } from '../api';
import { Featured, Hero, Trailers } from '../components';

export const HomePage = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['getDiscoverMovies'],
    queryFn: () => theMovieDBApi.getDiscoverMovies(),
  });

  if (data)
    return (
      <div className='container mx-auto'>
        <Hero />
        <Trailers movies={data.results} />
        <Featured />
      </div>
    );

  if (isError) {
    console.log(error);
    return <p>Error</p>;
  }
  if (isLoading) return <p>Loading...</p>;
};
