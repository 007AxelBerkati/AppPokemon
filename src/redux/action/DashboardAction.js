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
    async (res) => {
      const result = await res.data.results;

      const pokemonArray = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const pokemon of result) {
        const pokemonDetailsResponse = await axios.get(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.data;

        pokemonArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1),
          type: pokemonDetails.types[0].type.name,
          types: pokemonDetails.types,
          imgUrl: pokemonDetails.sprites.other['official-artwork'].front_default,
        });
      }

      dispatch(getPokemonSuccess(pokemonArray));
    },
  ).catch(
    (error) => {
      dispatch(getPokemonFailure(error));
      dispatch(getPokemonLoading(false));
    },
  );
};
