import axios from "axios";

import { base_url } from "./config.api";

export function getGroupsForGame(gameId) {
  return axios({
    method: "get",
    url: `${base_url}/group?gameId=${gameId}`,
  });
}
