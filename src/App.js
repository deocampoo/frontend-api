import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import Watchlist from './components/Watchlist';
import { Watched } from './components/Watched';
import { Add } from './components/Add';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario

  return (
    <GlobalProvider>
      <Router>
        {authenticated ? (
          <>
            <Navbar setAuthenticated={setAuthenticated} username={username} /> {/* Pasar el nombre de usuario a Navbar */}
            <Footer />
            <Routes>
              <Route path="/" element={<Home username={username} />} /> {/* Pasa el nombre de usuario a Home */}
              <Route path="/add" element={<Add />} />
              <Route path="/watched" element={<Watched />} />
              <Route path="/login" element={<Login setAuthenticated={setAuthenticated} setUsername={setUsername} />} /> {/* Pasa setUsername a Login */}
            </Routes>
          </>
        ) : (
          <div className="App">
            <Logo />
            <Login setAuthenticated={setAuthenticated} setUsername={setUsername} />
          </div>
        )}
      </Router>
    </GlobalProvider>
  );
}

export default App;
