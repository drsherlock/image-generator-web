import Automerge from "automerge";

import { UPDATE_LOCAL_STATE } from "../actions/types";

const initialState = {
  localState: Automerge.init()
};

export default function automerge(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCAL_STATE:
      return {
        localState: action.payload
      };
    default:
      return state;
  }
}
