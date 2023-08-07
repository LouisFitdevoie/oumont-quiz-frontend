import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function CorrectionPage() {
  const { gameId } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);
  const questionNumber = queryParams.get("questionNumber");
  const isEnded = queryParams.get("isEnded");
  const questionList = useLocation().state.questionList;
  const [questions, setQuestions] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {}, [questionList, gameId]);

  return (
    <div>
      <h1>Correction Page {gameId}</h1>
    </div>
  );
}
