import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '87698a34';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const MovieDetails = () => {
  const { imdbID } = useParams();  // imdbID is passed via route
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}&i=${imdbID}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Error fetching movie details.');
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <img src={movie.Poster} alt={movie.Title} />
      <p>Director: {movie.Director}</p>
      <p>Cast: {movie.Actors}</p>
      <p>Genre: {movie.Genre}</p>
      <p>IMDB Rating: {movie.imdbRating}</p>
    </div>
  );
};

export default MovieDetails;
