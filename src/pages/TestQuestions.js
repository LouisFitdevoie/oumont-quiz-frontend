import Header from "../components/Header";
import Question from "../components/questions/Question";
import music from "../assets/musics/test_sound.mp3";
import { getQuestions } from "../api/question.api";
import { useState, useEffect } from "react";
import { Howl } from "howler";
import { useNavigate, useLocation } from "react-router-dom";

export default function TestQuestions() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);
  const [allQuestions, setAllQuestions] = useState([]);
  const questionNumber = queryParams.has("questionNumber")
    ? parseInt(queryParams.get("questionNumber"))
    : 1;
  const timeToAnswer = {
    open: 0,
    multipleChoice: 0,
    estimate: 0,
  };

  const backgroundMusic = new Howl({
    src: [music],
    autoplay: false,
    html5: true,
    loop: false,
    volume: 0.5,
  });
  backgroundMusic.on("play", () => {
    backgroundMusic.stop();
  });
  backgroundMusic.on("stop", () => {
    backgroundMusic.unload();
  });

  const handleNextQuestion = () => {
    if (questionNumber === allQuestions.length) {
      navigate(`/`);
      return;
    }
    navigate(`/test-questions?questionNumber=${questionNumber + 1}`);
  };

  const handleBreakClicked = () => {
    console.log("Break clicked");
  };

  const handleEndGameClicked = () => {
    console.log("End game clicked");
  };

  const getAllQuestions = async () => {
    const response = await getQuestions();
    const questions = response.data.questions.sort((a, b) => {
      return a.theme.localeCompare(b.theme);
    });
    setAllQuestions(questions);
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col items-start"
      data-testid="add-groups-page-container"
    >
      <Header
        pageTitle={"Question n°" + questionNumber + "/" + allQuestions.length}
      />
      {allQuestions.length > 0 && (
        <Question
          question={allQuestions[questionNumber - 1]}
          handleNextQuestion={handleNextQuestion}
          questionNumber={questionNumber}
          timeToAnswer={timeToAnswer}
          handleBreakClicked={handleBreakClicked}
          handleEndGameClicked={handleEndGameClicked}
          backgroundMusic={backgroundMusic}
        />
      )}
    </div>
  );
}