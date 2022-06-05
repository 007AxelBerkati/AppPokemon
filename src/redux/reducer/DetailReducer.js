import { GET_POKEMON_DETAIL_FAILURE, GET_POKEMON_DETAIL_LOADING, GET_POKEMON_DETAIL_SUCCESS } from '../types';

const initialPokemonDetailState = {
  pokemonDetail: {},
  loading: false,
  error: null,
};

export const pokemonDetailReducer = (state = initialPokemonDetailState, action = {}) => {
  switch (action.type) {
    case GET_POKEMON_DETAIL_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case GET_POKEMON_DETAIL_SUCCESS:
      return {
        ...state,
        pokemonDetail: action.data,
        loading: false,
      };
    case GET_POKEMON_DETAIL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
