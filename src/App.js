import React, { useEffect, useState } from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from './components/Login';
import { LogoutButton } from './components/Logout';
import { Profile } from './components/Profile'; 
import  Logo    from './components/Logo';
import MovieApi from './components/movieApi';
function App() {
  const {isAuthenticated} = useAuth0();

  return (
    <div className='App'>
        {isAuthenticated ? (
          <>
            <Profile/>  
            <LogoutButton />
            <MovieApi />

          </>
        ) : (
          <div>
          <Logo />
          <LoginButton  /> {/*Esto es un boton*/}
          </div>
        )}
     
    </div>



  );
}

export default App;

{/*hola */}