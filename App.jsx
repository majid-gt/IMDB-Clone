import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './styles.css';

const API_KEY = '87698a34';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError('');
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" 
          alt="IMDb Logo" 
          className="logo" 
        />
        <form onSubmit={handleSubmit} className="search-form">
          <input 
            type="text"
            placeholder="Search IMDb Clone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </header>
      <main>
        {error && <div className="error">{error}</div>}
        <div className="movies-container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
