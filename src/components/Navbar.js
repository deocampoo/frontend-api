import React, { useState } from 'react';
import LogoutButton from './Logout';
import Logo from './Logo';
import { Profile } from './Profile';
import axios from 'axios';
import Home from './Home';
import Peliculas from './Peliculas';
import Series from './Series';
import { Watched } from './Watched';
import Watchlist from './Watchlist';
import FavoriteList from './FavoriteList';
import Search from './Search';

function Navbar({ setAuthenticated, username }) {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaDetails, setMediaDetails] = useState(null);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setSelectedMedia(null);
  };

  const handleMediaClick = async (mediaId) => {
    try {
      let response;
      if (currentSection === 'home') {
        response = await axios.get(`https://api.themoviedb.org/3/movie/${mediaId}?api_key=4f5f43495afcc67e9553f6c684a82f84&language=es`);
      } else {
        response = await axios.get(`https://api.themoviedb.org/3/${currentSection === 'movies' ? 'movie' : 'tv'}/${mediaId}?api_key=4f5f43495afcc67e9553f6c684a82f84&language=es`);
      }
      setSelectedMedia(mediaId);
      setMediaDetails(response.data);
    } catch (error) {
      console.error('Error fetching media details:', error);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" data-abc="true"><Logo /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className={`nav-link ${currentSection === 'home' ? 'active' : ''}`} href="#" data-abc="true" onClick={() => handleSectionChange('home')}>Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentSection === 'movies' ? 'active' : ''}`} href="#" data-abc="true" onClick={() => handleSectionChange('movies')}>Películas</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentSection === 'series' ? 'active' : ''}`} href="#" data-abc="true" onClick={() => handleSectionChange('series')}>Series</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentSection === 'watched' ? 'active' : ''}`} href="#" data-abc="true" onClick={() => handleSectionChange('watched')}>Vistas</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentSection === 'watchlist' ? 'active' : ''}`} href="#" data-abc="true" onClick={() => handleSectionChange('watchlist')}>Por ver</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentSection === 'favorites' ? 'active' : ''}`} href="#" data-abc="true" onClick={() => handleSectionChange('favorites')}>Favoritas</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentSection === 'search' ? 'active' : ''}`} href="#" data-abc="true" onClick={() => handleSectionChange('search')}>Busqueda</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Profile username={username} />
              </li>
              <li className="nav-item">
                <LogoutButton setAuthenticated={setAuthenticated} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={`content-container ${['movies', 'series', 'home', 'watched', 'watchlist', 'favorites', 'search', 'favoriteList'].includes(currentSection) ? 'violet-background' : ''}`}>
        <div className="scrollable-content">
          {currentSection === 'home' && <Home handleMediaClick={handleMediaClick} selectedMedia={selectedMedia} mediaDetails={mediaDetails} />}
          {currentSection === 'movies' && <Peliculas handleMediaClick={handleMediaClick} selectedMedia={selectedMedia} mediaDetails={mediaDetails} />}
          {currentSection === 'series' && <Series handleMediaClick={handleMediaClick} selectedMedia={selectedMedia} mediaDetails={mediaDetails} />}
          {currentSection === 'watched' && <Watched />}
          {currentSection === 'watchlist' && <Watchlist />}
          {currentSection === 'favorites' && <FavoriteList />}
          {currentSection === 'search' && <Search />}
          {currentSection === 'favoriteList' && <FavoriteList />} {/* Renderizar FavoriteList cuando currentSection es 'favoriteList' */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
