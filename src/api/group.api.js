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

export function updateGroupName(name, groupId) {
  return axios({
    method: "put",
    url: `${base_url}/group/updateName`,
    data: {
      name,
      groupId,
    },
  });
}

export function deleteGroup(groupId) {
  return axios({
    method: "delete",
    url: `${base_url}/group`,
    data: {
      groupId,
    },
  });
}
