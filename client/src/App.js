import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <a
          // set relative path...
          // ...let setupProxy.js append domain to this path
          href='/auth/google'
        >
          Sign in with Google
        </a>
      </header>
    </div>
  );
}

export default App;
