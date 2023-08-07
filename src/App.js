import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreateGamePage from "./pages/CreateGamePage";
import AddGroupPage from "./pages/AddGroupPage";
import QuestionPage from "./pages/QuestionPage";
import CorrectionPage from "./pages/CorrectionPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <div className="bg-yellow w-screen h-screen">
        <div className="max-w-7xl h-screen flex flex-col items-center mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-game" element={<CreateGamePage />} />
            <Route path="/add-groups/:gameId" element={<AddGroupPage />} />
            <Route path="/question/:gameId" element={<QuestionPage />} />
            <Route path="/correction/:gameId" element={<CorrectionPage />} />
            <Route path="/results/:gameId" element={<ResultPage />} />
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
