import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from './components/Login';
import  Logo    from './components/Logo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  const {isAuthenticated} = useAuth0();

  return (


    <div className='App'>

        {isAuthenticated ? (
          <>
         <Navbar/>
         <Footer/>
          </>
        ) : (
          <div>
          <Logo />
          <LoginButton  /> 
          </div>
        )}
     
    </div>


  );
}

export default App;

