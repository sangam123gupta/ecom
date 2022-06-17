import logo from './logo.svg';
import './App.css';

function App() {

  console.log("hello")

  function hey()
  {
    return 5;
  }

  let a=hey();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Edit <code>src/App.js</code> 
        <div>
          <h1>
            hello {a}
          </h1>
          
        </div>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
