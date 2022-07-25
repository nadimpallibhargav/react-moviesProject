import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import searchImg from './search.svg';

const apiUrl = 'http://www.omdbapi.com/?apikey=3ecbec74';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchTitle = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchTitle('batman');
  }, []);

  return (
    <div className='app'>
      <h1>EnglishRockerz</h1>

      <div className='search'>
        <input 
          placeholder='Search Movie' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchImg} alt='search' onClick={() => searchTitle(searchTerm)} />
      </div>      
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie, id) => 
            (<MovieCard key={id} movie={movie} />
          ))}
        </div>
        ) : (
        <div className='empty'>
          <h2>No Movies</h2>
        </div>
      )}
    </div>
  );
};

export default App;