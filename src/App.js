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

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <GlobalProvider>
      <Router>
        {authenticated ? (
          <>
            <Navbar setAuthenticated={setAuthenticated} />
            <Footer />
            <Routes>
              <Route exact path="/" element={<Watchlist />} />
              <Route path="/add" element={<Add />} />
              <Route path="/watched" element={<Watched />} />
              <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
            </Routes>
          </>
        ) : (
          <div className="App">
            <Logo />
            <Login setAuthenticated={setAuthenticated} />
          </div>
        )}
      </Router>
    </GlobalProvider>
  );
}

export default App;