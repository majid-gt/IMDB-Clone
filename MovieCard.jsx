import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} />
        <h2>{movie.Title}</h2>
      </Link>

      {isFavorite ? (
        <button onClick={() => removeFromFavorites(movie)}>Remove from Favorites</button>
      ) : (
        <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
      )}
    </div>
  );
};

export default MovieCard;
