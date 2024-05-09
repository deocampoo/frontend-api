import React, { useEffect, useState } from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from './components/Login';
import  Logo    from './components/Logo';
import MovieApi from './components/movieApi';
import Navbar from './components/Navbar'


function App() {
  const {isAuthenticated} = useAuth0();

  return (


    <div className='App'>

    
        {isAuthenticated ? (
          <>
           <Navbar/>
           <MovieApi/>

          </>
        ) : (
          <div>
          <h1 className='bienvenida'>Bienvenidos a</h1>
          <Logo />
          <LoginButton  /> 
          </div>
        )}
     
    </div>



  );
}

export default App;

