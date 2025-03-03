import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'} 
        alt={movie.Title} 
        className="movie-poster" 
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
