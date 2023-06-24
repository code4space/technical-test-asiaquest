import { POKEMON } from "../actions/actionType";

const initialState = {
  pokemon: [],
  id: null,
  name: "",
  task: [],
};

export default function TeacherReducer(state = initialState, action) {
  switch (action.type) {
    case POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    default:
      return state;
  }
}
