import { QUICK_NOTE, ROUTINE, TODO } from "../actions/actionType";

const initialState = {
  quickNote: [],
  routine: [],
  todo: [],
};

export default function NoteReducer(state = initialState, action) {
  switch (action.type) {
    case QUICK_NOTE:
      return {
        ...state,
        quickNote: action.payload,
      };
    case ROUTINE:
      return {
        ...state,
        routine: action.payload,
      };
    case TODO:
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
}
