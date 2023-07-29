import logo from "./logo.svg";
import "./App.css";

import Button from "./components/Button.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This app is currently under construction</p>
        <Button title="Créer une partie" onClick={() => console.log("test")} />
        <Button
          title="Historique des parties"
          onClick={() => console.log("test")}
        />
      </header>
    </div>
  );
}

export default App;
