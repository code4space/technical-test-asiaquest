import { baseUrl } from "../../constant/url";
import axios from "axios";
import { NOTIFICATION, TASK } from "./actionType";

export function taskFetchSuccess(payload) {
  return {
    type: TASK,
    payload,
  };
}

export function getTask() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        url: baseUrl + `/student/task`,
        method: "GET",
        headers: { access_token: localStorage.getItem("access_token") },
      });
      dispatch(taskFetchSuccess(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
}

export function notificationFetchSuccess(payload) {
  return {
    type: NOTIFICATION,
    payload,
  };
}

export function getNotification() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        url: baseUrl + `/notification`,
        method: "GET",
        headers: { access_token: localStorage.getItem("access_token") },
      });
      dispatch(notificationFetchSuccess(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
}
