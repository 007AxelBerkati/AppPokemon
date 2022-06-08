import React, {
  useEffect, useState, memo, useCallback,
} from 'react';
import {
  ActivityIndicator,
  FlatList, StatusBar, StyleSheet, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILNullPhoto } from '../../assets';
import {
  ButtonComponent, Footer, Header, PokemonCard,
} from '../../component';
import { GET_POKEMON_API, signOut } from '../../config';
import { getPokemon } from '../../redux';
import {
  colors, getData, onLogScreenView, removeData, showError,
} from '../../utils';

function DashboardPokemonScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataPokemon = useSelector((state) => state.dataPokemon);
  const loading = useSelector((state) => state.dataPokemon.loading);
  const pagination = useSelector((state) => state.dataPokemon.pagination);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
    uid: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const onHandleNext = useCallback(() => {
    setCurrentPage(currentPage + 1);
    dispatch(getPokemon(pagination.next));
  }, [currentPage, dispatch, pagination.next]);

  const onHandlePrevious = useCallback(() => {
    setCurrentPage(currentPage - 1);
    dispatch(getPokemon(pagination.previous));
  }, [currentPage, dispatch, pagination.previous]);

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
    });
  };

  const logOut = useCallback(() => {
    signOut().then(() => {
      removeData('user').then(() => navigation.replace('LoginScreen'));
    })
      .catch((err) => {
        showError(err.message);
      });
  }, [navigation]);

  const goToPokebag = useCallback(() => {
    navigation.navigate('PokebagScreen', { uid: profile.uid });
  }, [navigation, profile.uid]);

  useEffect(() => {
    onLogScreenView('DashboardScreen');
    getUserData();
    dispatch(getPokemon(`${GET_POKEMON_API}?offset=${0}&limit=${20}`));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background.primary} barStyle="dark-content" />
      <Header type="dashboard-profile" title="My Pokemon" onPress={logOut} />

      {
          loading ? (<ActivityIndicator />) : (
            <FlatList
              data={dataPokemon.pokemon}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(pokemon) => String(pokemon.id)}
              renderItem={({ item }) => <PokemonCard pokemon={item} onPress={() => navigation.navigate('PokemonDetailScreen', { id: item.id, uid: profile.uid })} />}
              // eslint-disable-next-line react/no-unstable-nested-components
              ListFooterComponent={({ item }) => (
                <Footer
                  dataPokemon={item}
                  onHandleNext={onHandleNext}
                  onHandlePrevious={onHandlePrevious}
                  currentPage={currentPage}
                />
              )}
            />
          )
        }

      <ButtonComponent icon="bag-personal" type="floating-btn" onPress={goToPokebag} />
    </View>
  );
}

export default memo(DashboardPokemonScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

});
