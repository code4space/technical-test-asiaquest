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
