import axios from "axios";

import { base_url } from "./config.api";

export function getGroupsForGame(gameId) {
  return axios({
    method: "get",
    url: `${base_url}/group?gameId=${gameId}`,
  });
}

export function createGroup(name, gameId) {
  return axios({
    method: "post",
    url: `${base_url}/group`,
    data: {
      name,
      gameId,
    },
  });
}
