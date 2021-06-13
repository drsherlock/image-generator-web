import {
  SELECT_IMAGE_STARTED,
  SELECT_IMAGE_SUCCESS,
  SELECT_IMAGE_FAILURE,
  GENERATE_IMAGE_STARTED,
  GENERATE_IMAGE_SUCCESS,
  GENERATE_IMAGE_FAILURE
} from "../actions/types";

export const initialState = {
  loading: false,
  imageId: "",
  images: [],
  error: null
};

export default function imagesReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_IMAGE_STARTED:
      return {
        ...state,
        images: [],
        loading: true
      };
    case SELECT_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        imageId: action.payload.id.toString()
      };
    case SELECT_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case GENERATE_IMAGE_STARTED:
      return {
        ...state,
        loading: true
      };
    case GENERATE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        images: [...state.images, action.payload.images]
      };
    case GENERATE_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
