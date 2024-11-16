import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = "32bf5632";
  const BASE_URL = "http://www.omdbapi.com/";

  // Fetch popular movies by default
  useEffect(() => {
    fetchMovies("Avengers"); // Default popular search
  }, []);

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: { s: query, apiKey: API_KEY },
      });
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: { i: id, apiKey: API_KEY },
      });
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="App">
      <header>
        <h1>Movie Search App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        {movies.length ? (
          <ul className="movie-list">
            {movies.map((movie) => (
              <li key={movie.imdbID} onClick={() => fetchMovieDetails(movie.imdbID)}>
                {movie.Title} ({movie.Year})
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found.</p>
        )}
      </main>
      {selectedMovie && (
        <div className="modal" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content">
            <h2>{selectedMovie.Title}</h2>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
            <p><strong>Ratings:</strong> {selectedMovie.imdbRating}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
