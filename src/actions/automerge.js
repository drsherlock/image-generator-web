import { UPDATE_LOCAL_STATE } from "./types";

export const updateLocalState = data => ({
  type: UPDATE_LOCAL_STATE,
  payload: data
});
