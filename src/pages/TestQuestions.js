import Header from "../components/Header";
import Question from "../components/questions/Question";
import music from "../assets/musics/question_music.mp3";
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
      alert(
        "Il n'y a plus de questions, vous allez être redirigé vers la page d'accueil"
      );
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
        <div className="flex flex-row items-center w-full">
          <div className="mx-auto">
            <p>Type : {allQuestions[questionNumber - 1].questionType}</p>
            <p>Thème : {allQuestions[questionNumber - 1].theme}</p>
            <p>Points : {allQuestions[questionNumber - 1].points}</p>
          </div>
        </div>
      )}
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
