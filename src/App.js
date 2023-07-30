import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-yellow w-screen h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-game" element={<h1>Create Game</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
