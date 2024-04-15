import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from './components/Login';
import { LogoutButton } from './components/Logout';
import { Profile } from './components/Profile'; 
import './App.css';

function App() {
  const {isAuthenticated} = useAuth0();
  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
          <>
            <Profile />
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </header>
    </div>
  );
}

export default App;
