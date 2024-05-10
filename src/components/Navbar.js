import React, { useState, useEffect, useRef } from 'react';
import { LogoutButton } from './Logout';
import Logo from './Logo';
import { Profile } from './Profile';
import axios from 'axios';


function Navbar() {
  const [currentSection, setCurrentSection] = useState('home');
  const [mediaList, setMediaList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null); 
  const [mediaDetails, setMediaDetails] = useState(null); 
  const loadingRef = useRef(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        let response;
        if (currentSection === 'home') {
          response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=4f5f43495afcc67e9553f6c684a82f84&page=${page}`);
        } else {
          response = await axios.get(`https://api.themoviedb.org/3/${currentSection === 'movies' ? 'movie' : 'tv'}/popular?api_key=4f5f43495afcc67e9553f6c684a82f84&page=${page}`);
        }
        setMediaList(prevList => [...prevList, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    setPage(1);
    setMediaList([]);
    fetchMedia();
  }, [currentSection, page]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadingRef.current]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setPage(1);
    setSelectedMedia(null); // Al cambiar de sección, limpiamos la película o serie seleccionada
  };

  const handleMediaClick = async (mediaId) => {
    try {
      let response;
      if (currentSection === 'home') {
        // Si la sección actual es 'home', usamos un endpoint diferente para obtener los detalles de la película
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
          <a className="navbar-brand" href="#" data-abc="true"><Logo/></a>
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
                <a className="nav-link" href="#" data-abc="true">Mis listas</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Profile />
              </li>
              <li className="nav-item">
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={`media-list-container ${currentSection === 'movies' ? 'movies-bg' : ''} ${currentSection === 'home' ? 'home-bg' : ''} ${currentSection === 'series' ? 'series-bg' : ''}`} style={{ width: '100%', overflowX: 'hidden' }}>
        <div className="media-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', width: '100%' }}>
          {mediaList.map((media, index) => (
            <div key={index} className={`media-item ${selectedMedia === media.id ? 'selected' : ''}`} style={{ flex: '1 0 250px', maxWidth: '250px' }} onClick={() => handleMediaClick(media.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${media.poster_path}`} alt={media.title || media.name} style={{ width: '100%', height: 'auto', maxWidth: '250px' }} />
            </div>
          ))}
          <div ref={loadingRef}>{loading && 'Cargando...'}</div>
        </div>
      </div>
      {selectedMedia && mediaDetails && (
        <div className="media-details" style={{ color: 'white' }}>
          <h2 style={{ color: 'white' }}>{mediaDetails.title || mediaDetails.name}</h2>
          <p style={{ color: 'white' }}>{mediaDetails.overview}</p>
        </div>
      )}
    </div>
  );

}

export default Navbar;
