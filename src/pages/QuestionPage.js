import { useEffect, useState } from "react";

import Header from "../components/Header";
import ChooseTheme from "../components/ChooseTheme";
import { getGame } from "../api/game.api.js";
import { getGroupsForGame } from "../api/group.api";
import { getRandomThemes } from "../api/question.api";
import { useParams } from "react-router-dom";

export default function QuestionPage() {
  const { gameId } = useParams();
  const [game, setGame] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [initialGroups, setInitialGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isThemeChosen, setIsThemeChosen] = useState(true);
  const [themeId, setThemeId] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [randomThemes, setRandomThemes] = useState([]);

  const handleGetGame = async (gameId) => {
    const response = await getGame(gameId);
    setGame(response.data.game);
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
    setGroups(groups);
  };

  const handleThemeChoice = (themeId) => {
    setIsThemeChosen(true);
    setThemeId(themeId);
    setRandomThemes([]);
    setTimeout(() => {
      setQuestionNumber(questionNumber + 3);
      setIsThemeChosen(false);
    }, 2000);
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
    const response = await getRandomThemes(gameId);
    setRandomThemes(response.data.themes);
  };

  useEffect(() => {
    handleGetGame(gameId);
    handleGetGroups(gameId);
  }, [gameId]);

  useEffect(() => {
    if ((questionNumber - 1) % 3 === 0) {
      setIsThemeChosen(false);
      setThemeId(null);
    }
  }, [questionNumber]);

  useEffect(() => {
    if (!isThemeChosen && initialGroups.length > 0) {
      handleGetRandomGroup();
      handleGetRandomThemes();
    }
  }, [isThemeChosen, initialGroups]);

  return (
    <div
      className="w-full h-screen flex flex-col items-start"
      data-testid="add-groups-page-container"
    >
      <Header pageTitle={`${game.name} - Question n°${questionNumber}`} />
      {!isThemeChosen && currentGroup != null && (
        <ChooseTheme
          handleThemeChoice={handleThemeChoice}
          groupName={currentGroup.name}
          themes={randomThemes}
        />
      )}
      {isThemeChosen && <p>{themeId}</p>}
    </div>
  );
}
