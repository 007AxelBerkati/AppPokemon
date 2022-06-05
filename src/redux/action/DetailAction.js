import axios from 'axios';
import { GET_POKEMON_API } from '../../config';
import { GET_POKEMON_DETAIL_FAILURE, GET_POKEMON_DETAIL_LOADING, GET_POKEMON_DETAIL_SUCCESS } from '../types';

export const getDetailSuccess = (data) => ({
  type: GET_POKEMON_DETAIL_SUCCESS,
  data,
});

export const getDetailFailure = (error) => ({
  type: GET_POKEMON_DETAIL_FAILURE,
  error,
});

export const getDetailLoading = (loading) => ({
  type: GET_POKEMON_DETAIL_LOADING,
  loading,
});

export const getDetail = (id) => async (dispatch) => {
  dispatch(getDetailLoading(true));
  await axios.get(`${GET_POKEMON_API}/${id}`).then(
    async (res) => {
      if (res.data) {
        const data = {
          ...res.data,
          type: res.data.types[0].type.name,
          name: res.data.name[0].toUpperCase() + res.data.name.substring(1),
        };
        dispatch(getDetailSuccess(data));
      }
    },
  ).catch(
    (error) => {
      dispatch(getDetailFailure(error));
      dispatch(getDetailLoading(false));
    },
  );
};
