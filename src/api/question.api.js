import axios from "axios";

import { base_url } from "./config.api";

export function createQuestion(gameId, fileLines) {
  return axios({
    method: "post",
    url: `${base_url}/questions`,
    data: {
      gameId: gameId,
      fileLines: fileLines,
    },
  });
}

export function createQuestionJSON(question) {
  return {
    method: "post",
    url: `${base_url}/questionJSON`,
    data: {
      question,
    },
  };
}

export function getRandomThemes(gameId) {
  return axios({
    method: "get",
    url: `${base_url}/randomThemes?gameId=${gameId}`,
  });
}

export function getRandomQuestion(theme, gameId) {
  return axios({
    method: "get",
    url: `${base_url}/randomQuestion?gameId=${gameId}&theme=${theme}`,
  });
}

export function getQuestionById(questionId) {
  return axios({
    method: "get",
    url: `${base_url}/question/${questionId}`,
  });
}

export function getQuestionImage(imageName) {
  return axios({
    method: "get",
    url: `${base_url}/questionImage?imageName=${imageName}`,
    responseType: "arraybuffer",
  });
}

export function getQuestions() {
  return axios({
    method: "get",
    url: `${base_url}/questions`,
  });
}

export function deleteQuestionsForGameId(gameId) {
  return axios({
    method: "delete",
    url: `${base_url}/questions/${gameId}`,
  });
}
