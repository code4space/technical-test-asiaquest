import { combineReducers } from "redux";
import TeacherReducer from "./teacher";
import StudentReducer from "./student";
import NoteReducer from "./note";

const rootReducer = combineReducers({
    TeacherReducer,
    StudentReducer,
    NoteReducer,
})

export default rootReducer