import React, { useEffect, useState } from 'react';
import {
  FlatList, StatusBar, StyleSheet, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILNullPhoto } from '../../assets';
import { ButtonComponent, Header, Loading } from '../../component';
import PokemonCard from '../../component/molekul/PokemonCard';
import { signOut } from '../../config';
import { getPokemon } from '../../redux';
import {
  colors, getData, onLogScreenView, removeData, showError,
} from '../../utils';

function DashboardPokemonScreen({ navigation }) {
  const dispatch = useDispatch();

  const dataPokemon = useSelector((state) => state.dataPokemon);
  const loading = useSelector((state) => state.dataPokemon.loading);

  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
    uid: '',
  });
  // const [nextPage, setNextPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    onLogScreenView('DashboardScreen');
    getUserData();
    dispatch(getPokemon(0));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
    });
  };

  const logOut = () => {
    signOut().then(() => {
      removeData('user').then(() => navigation.replace('LoginScreen'));
    })
      .catch((err) => {
        showError(err.message);
      });
  };

  return loading ? <Loading /> : (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background.primary} barStyle="dark-content" />
      <Header type="dashboard-profile" title="My Pokemon" onPress={logOut} />
      <FlatList
        data={dataPokemon.pokemon}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} onPress={() => navigation.navigate('PokemonDetailScreen', { id: item.id, uid: profile.uid })} />}
      />
      <ButtonComponent icon="bag-personal" type="floating-btn" onPress={() => navigation.navigate('PokebagScreen', { uid: profile.uid })} />
    </View>
  );
}

export default DashboardPokemonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    // padding: 10,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

});
