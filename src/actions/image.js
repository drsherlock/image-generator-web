import axios from "axios";

import { config } from "../config";

import {
  SELECT_IMAGE_STARTED,
  SELECT_IMAGE_SUCCESS,
  SELECT_IMAGE_FAILURE,
  GENERATE_IMAGE_STARTED,
  GENERATE_IMAGE_SUCCESS,
  GENERATE_IMAGE_FAILURE,
  SET_IMAGE_ID
} from "./types";

export const selectImage = request => {
  return async dispatch => {
    dispatch(selectImageStarted());
    try {
      const response = await axios.post(`${config.API}/upload`, request, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch(selectImageSuccess(response.data));
    } catch (err) {
      dispatch(selectImageFailure(err.message));
    }
  };
};

export const generateImage = request => {
  return async dispatch => {
    dispatch(generateImageStarted());
    try {
      const response = await axios.post(`${config.API}/generate`, request, {
        headers: {
          "Content-Type": "application/json"
        }
        // responseType: "blob"
      });
      dispatch(generateImageSuccess(response.data));
    } catch (err) {
      dispatch(generateImageFailure(err.message));
    }
  };
};

const selectImageStarted = () => ({
  type: SELECT_IMAGE_STARTED
});

const selectImageSuccess = data => ({
  type: SELECT_IMAGE_SUCCESS,
  payload: {
    ...data
  }
});

const selectImageFailure = error => ({
  type: SELECT_IMAGE_FAILURE,
  payload: {
    error
  }
});

const generateImageStarted = () => ({
  type: GENERATE_IMAGE_STARTED
});

const generateImageSuccess = data => ({
  type: GENERATE_IMAGE_SUCCESS,
  payload: {
    ...data
  }
});

const generateImageFailure = error => ({
  type: GENERATE_IMAGE_FAILURE,
  payload: {
    error
  }
});

export const setImageId = id => ({
  type: SET_IMAGE_ID,
  payload: {
    id
  }
});
