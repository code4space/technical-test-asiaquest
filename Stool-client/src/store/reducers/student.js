import { NOTIFICATION, TASK } from "../actions/actionType";

const initialState = {
  task: [],
  notification: [],
};

export default function StudentReducer(state = initialState, action) {
  switch (action.type) {
    case TASK:
      return {
        ...state,
        task: action.payload,
      };
    case NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
}
