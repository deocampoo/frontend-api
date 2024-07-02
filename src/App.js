import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import { Watched } from './components/Watched';
import { Add } from './components/Add';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Logout from './components/Logout';
import ScrollFooter from './components/ScrollFooter';
import Peliculas from './components/Peliculas';
import Series from './components/Series';
import Watchlist from './components/Watchlist';
import Favorites from './components/FavoriteList';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [registerSuccess, setRegisterSuccess] = useState(false); // Estado para el éxito del registro

  return (
    <GlobalProvider>
      <Router>
        {authenticated ? (
          <>
            <Navbar setAuthenticated={setAuthenticated} username={username} /> {/* Pasar el nombre de usuario a Navbar */}
            <ScrollFooter>
              <Routes>
                <Route path="/" element={<Home username={username} />} /> {/* Pasa el nombre de usuario a Home */}
                <Route path="/add" element={<Add />} />
                <Route path="/watched" element={<Watched />} />
                <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
                <Route path="/movies" element={<Peliculas />} />
                <Route path="/series" element={<Series />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </ScrollFooter>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <div className="App">
                  <Logo />
                  <Login setAuthenticated={setAuthenticated} setUsername={setUsername} registerSuccess={registerSuccess} />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="App">
                  <Logo />
                  <Register setRegisterSuccess={setRegisterSuccess} />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </GlobalProvider>
  );
}

export default App;
