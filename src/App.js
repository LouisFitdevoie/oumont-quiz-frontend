import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreateGamePage from "./pages/CreateGamePage";
import AddGroupPage from "./pages/AddGroupPage";
import QuestionPage from "./pages/QuestionPage";
import CorrectionPage from "./pages/CorrectionPage";
import ResultPage from "./pages/ResultPage";
import Page404 from "./pages/Page404";
import RulesPage from "./pages/RulesPage";
import TestQuestions from "./pages/TestQuestions";
import HistoryPage from "./pages/HistoryPage";

//TODO : Empêcher de retourner en arrière dans le navigateur après avoir commencé la partie
//TODO : Create the Game History page
//TODO : Update the README.md files
//TODO : Bonus ?

function App() {
  return (
    <Router>
      <div className="bg-yellow w-screen h-screen overflow-auto">
        <div className="max-w-7xl h-screen flex flex-col items-center mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-game" element={<CreateGamePage />} />
            <Route path="/add-groups/:gameId" element={<AddGroupPage />} />
            <Route path="/question/:gameId" element={<QuestionPage />} />
            <Route path="/correction/:gameId" element={<CorrectionPage />} />
            <Route path="/results/:gameId" element={<ResultPage />} />
            <Route path="/rules/:gameId" element={<RulesPage />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/test-questions" element={<TestQuestions />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
