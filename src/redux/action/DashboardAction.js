import axios from 'axios';
import { GET_POKEMON_API } from '../../config';
import { GET_POKEMON_FAILURE, GET_POKEMON_LOADING, GET_POKEMON_SUCCESS } from '../types';

export const getPokemonSuccess = (pokemon) => ({
  type: GET_POKEMON_SUCCESS,
  pokemon,
});

export const getPokemonFailure = (error) => ({
  type: GET_POKEMON_FAILURE,
  error,
});

export const getPokemonLoading = (loading) => ({
  type: GET_POKEMON_LOADING,
  loading,
});

export const getPokemon = (nextPage) => async (dispatch) => {
  dispatch(getPokemonLoading(true));
  await axios.get(`${GET_POKEMON_API}?offset=${nextPage}&limit=20`).then(
    (res) => {
      dispatch(getPokemonSuccess(res.data));
      dispatch(getPokemonLoading(false));
    },
  ).catch(
    (error) => {
      dispatch(getPokemonFailure(error));
      dispatch(getPokemonLoading(false));
    },
  );
};
