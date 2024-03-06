import { useState, useEffect } from 'react';
import './App.css'
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// api key omdbapi = 8ce37b1f
const API_URL = 'http://www.omdbapi.com?apikey=8ce37b1f';

const movie1 = {
  "Title": "Thor: The Dark World",
  "Year": "2013",
  "imdbID": "tt1981115",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTQyNzAwOTUxOF5BMl5BanBnXkFtZTcwMTE0OTc5OQ@@._V1_SX300.jpg"
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('');
  }, []);

  return(
    <div className='app'>
      <h1>PiRAWAN</h1>

      <div className='search'>
        <input 
          placeholder='Search for the movie'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {/*mapping through movies*/}
      {movies?.length > 0
        ? (
         <div className='container'>
            {movies.map((movie) => (
            <MovieCard movie={movie}/>
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}

    </div>
  )
}

export default App
