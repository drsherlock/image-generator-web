import Automerge from "automerge";

import { SELECT_TITLE } from "../actions/types";

const initialState = {
  localState: Automerge.init()
};

export default function imagesReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_TITLE:
      return {
        localState: action.payload
      };
    default:
      return state;
  }
}
