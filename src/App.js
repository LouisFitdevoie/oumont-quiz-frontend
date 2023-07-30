import logo from "./logo.svg";
import "./App.css";

import Logo from "./components/Logo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This app is currently under construction</p>
        <Logo />
      </header>
    </div>
  );
}

export default App;
