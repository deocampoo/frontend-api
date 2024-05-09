import React from 'react';
import { LogoutButton } from './Logout';
import Logo from './Logo';
import { Profile } from './Profile';

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" data-abc="true"><Logo/></a>

          {/* Botón para colapsar el navbar en dispositivos móviles */} 
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido del navbar */}
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" data-abc="true">Género</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" data-abc="true">Idioma</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" data-abc="true">Actores</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" data-abc="true">Director</a>
              </li>
            </ul>
            
            {/* Perfil y botón de cierre de sesión */}
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
    </div>
  );
}

export default Navbar;