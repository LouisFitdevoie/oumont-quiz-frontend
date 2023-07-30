import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="bg-yellow w-screen h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-game" element={<h1>Create Game</h1>} />
          <Route
            path="*"
            element={<h1>404 - Page Not Found (PAGE NOT BUILT YET)</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
