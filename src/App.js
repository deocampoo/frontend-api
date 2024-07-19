import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import  Watched  from './components/Watched';
import { Add } from './components/Add';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Logout from './components/Logout';
import Peliculas from './components/Peliculas';
import Series from './components/Series';
import Watchlist from './components/Watchlist';
import Favorites from './components/FavoriteList';
import Footer from './components/Footer';
import Background from './components/Background';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false); 

  const handleLogout = () => {
    setAuthenticated(false);
    setUsername('');
    setRegisterSuccess(false); 
    localStorage.removeItem('token');
  };

  return (
    <GlobalProvider>
      <Router>
        {authenticated ? (
          <>
            <Navbar setAuthenticated={setAuthenticated} username={username} handleLogout={handleLogout} /> 
            <div className="App">
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home username={username} />} /> 
                  <Route path="/add" element={<Add />} />
                  <Route path="/watched" element={<Watched />} />
                  <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
                  <Route path="/movies" element={<Peliculas />} />
                  <Route path="/series" element={<Series />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <div className="App">
                <Background/>
                  <Login setAuthenticated={setAuthenticated} setUsername={setUsername} registerSuccess={registerSuccess} />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="App">
                  <Background/>
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
