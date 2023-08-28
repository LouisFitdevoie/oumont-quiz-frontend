import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Howl } from "howler";

import Header from "../components/Header";
import ChooseTheme from "../components/ChooseTheme";
import { getGame } from "../api/game.api.js";
import { getGroupsForGame } from "../api/group.api";
import { getRandomThemes, getRandomQuestion } from "../api/question.api";
import Question from "../components/questions/Question";
import music from "../assets/musics/test_sound.mp3";
import LoadingIndicator from "../components/LoadingIndicator";

export default function QuestionPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [initialGroups, setInitialGroups] = useState([]);
  const state = useLocation().state;
  const groupsLeftList =
    state === null
      ? []
      : state.hasOwnProperty("groupsLeftList")
      ? state.groupsLeftList
      : [];
  const [groups, setGroups] = useState(
    groupsLeftList.length > 0 ? groupsLeftList : []
  );
  const [isThemeChosen, setIsThemeChosen] = useState(true);
  const [themeName, setThemeName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(
    parseInt(localStorage.getItem("questionNumber")) || 1
  );
  const [currentGroup, setCurrentGroup] = useState(null);
  const [randomThemes, setRandomThemes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isQuestionSelected, setIsQuestionSelected] = useState(false);
  const [timeToAnswer, setTimeToAnswer] = useState({
    open: 0,
    multipleChoice: 0,
    estimate: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const backgroundMusic = new Howl({
    src: [music],
    autoplay: false,
    html5: true,
    loop: false,
    volume: 0.5,
  });
  backgroundMusic.on("stop", () => {
    backgroundMusic.unload();
  });
  backgroundMusic.on("end", () => {
    backgroundMusic.stop();
    backgroundMusic.unload();
  });
  window.onbeforeunload = () => {
    backgroundMusic.stop();
    backgroundMusic.unload();
  };

  const handleGetGame = async (gameId) => {
    const response = await getGame(gameId);
    setGame(response.data.game);
    const timesToAnswer = response.data.game.timeToAnswer.split(",");
    setTimeToAnswer({
      multipleChoice: timesToAnswer[0], //RECEIVED IN THIS ORDER FROM BACKEND : timeToAnswerQCM, timeToAnswerOpen, timeToAnswerEstimate
      open: timesToAnswer[1],
      estimate: timesToAnswer[2],
    });
  };

  const handleGetGroups = async (gameId) => {
    const response = await getGroupsForGame(gameId);
    let groups = [];
    response.data.groups.forEach((group) => {
      groups.push({
        name: group.name,
        id: group.id,
      });
    });
    setInitialGroups(groups);
    if (groupsLeftList.length === 0) {
      setGroups(groups);
    }
  };

  const handleThemeChoice = (themeName) => {
    setIsThemeChosen(true);
    setThemeName(themeName);
    setRandomThemes([]);
  };

  const handleGetRandomGroup = () => {
    if (groups.length === 1) {
      setCurrentGroup(groups[0]);
      setGroups(initialGroups);
      return;
    }
    const randomIndex = Math.floor(Math.random() * groups.length);
    const groupToReturn = groups[randomIndex];
    const updatedGroups = groups.filter(
      (group, index) => index !== randomIndex
    );
    setGroups(updatedGroups);
    setCurrentGroup(groupToReturn);
  };

  const handleGetRandomThemes = async () => {
    try {
      setIsLoading(true);
      const response = await getRandomThemes(gameId);
      setRandomThemes(response.data.themes);
    } catch (error) {
      alert(
        "Une erreur est survenue lors de la récupération des thèmes, essayez d'actualiser la page"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRandomQuestion = async () => {
    const response = await getRandomQuestion(themeName, gameId);
    setCurrentQuestion(response.data.question);
    const questionsAlreadyAsked = questionList;
    questionsAlreadyAsked.push({
      order: questionsAlreadyAsked.length,
      questionId: response.data.question.id,
    });
    setQuestionList(questionsAlreadyAsked);
    localStorage.setItem("questionList", JSON.stringify(questionsAlreadyAsked));
    setIsQuestionSelected(true);
  };

  const handleNextQuestion = () => {
    localStorage.setItem("questionNumber", questionNumber + 1);
    setQuestionNumber(questionNumber + 1);
    if (questionNumber % 3 === 0) {
      setIsThemeChosen(false);
      setThemeName(null);
      setCurrentQuestion({});
      setIsQuestionSelected(false);
    } else {
      setIsQuestionSelected(false);
      setCurrentQuestion({});
      handleGetRandomQuestion();
    }
  };

  const handleBreakClicked = () => {
    backgroundMusic.stop();
    navigate(`/correction/${gameId}?isEnded=false`, {
      state: {
        groupsLeftList: groups,
      },
    });
  };

  const handleEndGameClicked = () => {
    backgroundMusic.stop();
    navigate(`/correction/${gameId}?isEnded=true`, {
      state: {
        groupsLeftList: groups,
      },
    });
  };

  useEffect(() => {
    setQuestionList(JSON.parse(localStorage.getItem("questionList")) || []);
  }, []);

  useEffect(() => {
    handleGetGame(gameId);
    handleGetGroups(gameId);
  }, [gameId]);

  useEffect(() => {
    if ((questionNumber - 1) % 3 === 0) {
      setIsThemeChosen(false);
      setThemeName(null);
    }
  }, [questionNumber]);

  useEffect(() => {
    if (!isThemeChosen && initialGroups.length > 0) {
      handleGetRandomGroup();
      handleGetRandomThemes();
    } else if (
      isThemeChosen &&
      initialGroups.length > 0 &&
      themeName !== null
    ) {
      handleGetRandomQuestion();
    }
  }, [isThemeChosen, initialGroups]);

  return (
    <div
      className="w-full h-screen flex flex-col items-start"
      data-testid="add-groups-page-container"
    >
      <Header
        pageTitle={`${game.name} - ${
          !isThemeChosen
            ? "Choix du prochain thème"
            : `Question n°${questionNumber}`
        }`}
      />
      {!isThemeChosen && currentGroup != null && (
        <ChooseTheme
          handleThemeChoice={handleThemeChoice}
          groupName={currentGroup.name}
          themes={randomThemes}
          handleEndGameClicked={handleEndGameClicked}
          isLoading={isLoading}
        />
      )}
      {isThemeChosen && isQuestionSelected && currentQuestion !== {} && (
        <Question
          question={currentQuestion}
          handleNextQuestion={handleNextQuestion}
          questionNumber={questionNumber}
          timeToAnswer={timeToAnswer}
          handleBreakClicked={handleBreakClicked}
          handleEndGameClicked={handleEndGameClicked}
          backgroundMusic={backgroundMusic}
        />
      )}
      {isLoading && <LoadingIndicator />}
    </div>
  );
}
