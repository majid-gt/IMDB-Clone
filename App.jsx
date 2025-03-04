import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import './styles.css';
import { Link, Route, Routes } from 'react-router-dom';

const API_KEY = '87698a34';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      if (data.Response === 'True') {
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

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm);
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
            alt="IMDb Logo"
            className="logo"
          />
          <div className="nav-buttons">
            <Link to="/" className="button">Home</Link>
            <Link to="/favorites" className="button">Favourites</Link>
          </div>
        </div>
        <form className="search-form">
          <input
            type="text"
            placeholder="Search IMDb Clone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </form>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              {error && <div className="error">{error}</div>}
              <div className="movies-container">
                {movies.map((movie) => (
                  <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
                    <MovieCard
                      movie={movie}
                      addToFavorites={addToFavorites}
                      removeFromFavorites={removeFromFavorites}
                      isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                    />
                  </Link>
                ))}
              </div>
            </main>
          }
        />
        <Route
          path="/favorites"
          element={
            <div className="favorites-section">
              <h2>My Favorite Movies</h2>
              <div className="movies-container">
                {favorites.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    removeFromFavorites={removeFromFavorites}
                    isFavorite={true}
                  />
                ))}
              </div>
            </div>
          }
        />
        {/* Route for showing movie details */}
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
