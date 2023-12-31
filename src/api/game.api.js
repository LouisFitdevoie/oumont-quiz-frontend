import axios from "axios";

import { base_url } from "./config.api";

export function createGame(
  name,
  timeToAnswerOpen,
  timeToAnswerQCM,
  timeToAnswerEstimate,
  personsPerGroup
) {
  return axios({
    method: "post",
    url: `${base_url}/game`,
    data: {
      name: name,
      timeToAnswerOpen: timeToAnswerOpen,
      timeToAnswerQCM: timeToAnswerQCM,
      timeToAnswerEstimate: timeToAnswerEstimate,
      personsPerGroup: personsPerGroup,
    },
  });
}

export function getGame(gameId) {
  return axios({
    method: "get",
    url: `${base_url}/game/${gameId}`,
  });
}

export function deleteGame(gameId) {
  return axios({
    method: "delete",
    url: `${base_url}/game/${gameId}`,
  });
}
