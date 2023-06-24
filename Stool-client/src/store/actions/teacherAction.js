// import { baseUrl } from "../../constant/url";
import axios from "axios";
import { TEACHER_TASK } from "./actionType";
import { baseUrl } from "../../constant/url";

export function teacherTaskFetchSuccess(payload) {
  return {
    type: TEACHER_TASK,
    payload,
  };
}

export function getTeacherTask() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        url: baseUrl + `/completed-task`,
        method: "GET",
        headers: { access_token: localStorage.getItem("access_token") },
      });
      dispatch(teacherTaskFetchSuccess(response.data.completed));
    } catch (error) {
      console.log(error);
    }
  };
}
