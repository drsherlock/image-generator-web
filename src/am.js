import Automerge from "automerge";

export const change = (state, message, change) => {
  return Automerge.change(state, message, change);
};

export const getAllChanges = state => {
  return Automerge.getAllChanges(state);
};

export const getChanges = (state, newState) => {
  return Automerge.getChanges(state, newState);
};

export const applyChanges = (state, changes) => {
  return Automerge.applyChanges(state, changes);
};
