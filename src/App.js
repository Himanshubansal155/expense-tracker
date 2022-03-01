import Login from "./components/Login/Login";
import Signup from "./components/signup/signup";
import NavigationPage from "./components/NavigationPage/NavigationPage";

function App() {
  return (
    
    <div>
      <p className="p-1">
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <Login />
      <div>
        <Signup />
      </div>
      <NavigationPage />
    </div>
    
    
    
  );
}

export default App;
