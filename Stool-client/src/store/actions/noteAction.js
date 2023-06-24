import { baseUrl } from "../../constant/url";
import axios from "axios";
import { QUICK_NOTE, ROUTINE, TODO } from "./actionType";

export function quickNoteFetchSuccess(payload) {
  return {
    type: QUICK_NOTE,
    payload,
  };
}

export function getQuickNote() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        url: baseUrl + `/quick-note`,
        method: "GET",
        headers: { access_token: localStorage.getItem("access_token") },
      });
      dispatch(quickNoteFetchSuccess(response.data.note));
    } catch (error) {
      console.log(error);
    }
  };
}

export function routineFetchSuccess(payload) {
  return {
    type: ROUTINE,
    payload,
  };
}

export function getRoutine() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        url: baseUrl + `/routine`,
        method: "GET",
        headers: { access_token: localStorage.getItem("access_token") },
      });
      dispatch(routineFetchSuccess(response.data.routine));
    } catch (error) {
      console.log(error);
    }
  };
}

export function todoFetchSuccess(payload) {
  return {
    type: TODO,
    payload,
  };
}

export function getTodo() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        url: baseUrl + `/todo`,
        method: "GET",
        headers: { access_token: localStorage.getItem("access_token") },
      });
      dispatch(todoFetchSuccess(response.data.todo));
    } catch (error) {
      console.log(error);
    }
  };
}
