import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GlobalProvider } from './context/GlobalState';
import Watchlist from './components/Watchlist';
import {Watched} from './components/Watched';
import {Add} from './components/Add';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LoginButton } from './components/Login';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <GlobalProvider>
      <Router>
        {isAuthenticated ? (
          <>
            <Navbar />
            <Footer />
            <Routes>
              <Route exact path="/" element={<Watchlist />} /> {/* Usa element prop para especificar el componente */}
              <Route path="/add" element={<Add />} />
              <Route path="/watched" element={<Watched />} />
            </Routes>
          </>
        ) : (
          <div className="App">
            <Logo />
            <LoginButton />
          </div>
        )}
      </Router>
    </GlobalProvider>
  );
}

export default App;