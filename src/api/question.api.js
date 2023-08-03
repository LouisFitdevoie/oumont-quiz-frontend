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
