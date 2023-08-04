import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import AddGroup from "./pages/AddGroup";

function App() {
  return (
    <Router>
      <div className="bg-yellow w-screen h-screen">
        <div className="max-w-7xl h-screen flex flex-col items-center mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/add-groups/:gameId" element={<AddGroup />} />
            <Route
              path="*"
              element={<h1>404 - Page Not Found (PAGE NOT BUILT YET)</h1>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
