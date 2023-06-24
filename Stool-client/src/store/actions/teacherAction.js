// import { baseUrl } from "../../constant/url";
import axios from "axios";
import { POKEMON } from "./actionType";

export function pokemonFetchSuccess(payload) {
  return {
    type: POKEMON,
    payload,
  };
}

export function getPokemon() {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/ditto`
      );
      dispatch(pokemonFetchSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchTeacherInfoSuccess(payload) {
  return {
    type: USER,
    payload,
  };
}

export function setTeacherRole() {
  return {
    type: TEACHER_ROLE,
    payload: 'teacher',
  };
}

export function getTeacherInfo() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        url: baseUrl + "/user",
        method: "GET",
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const data = response.data.data;
      dispatch(
        fetchTeacherInfoSuccess({
          gacha: data.gacha,
          balls: data.balls,
          draw: data.draw,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}
