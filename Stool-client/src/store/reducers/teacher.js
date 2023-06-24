import { TEACHER_TASK } from "../actions/actionType";

const initialState = {
  task: [],
};

export default function TeacherReducer(state = initialState, action) {
  switch (action.type) {
    case TEACHER_TASK:
      return {
        ...state,
        task: action.payload,
      };
    default:
      return state;
  }
}
