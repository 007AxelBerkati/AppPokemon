import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList, StatusBar, StyleSheet, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILNullPhoto } from '../../assets';
import {
  ButtonComponent, Footer, Header,
} from '../../component';
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
  const [nextPage, setNextPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onHandleNext = () => {
    setNextPage(nextPage + 20);
    setCurrentPage(currentPage + 1);
  };

  const onHandlePrevious = () => {
    setNextPage(nextPage - 20);
    setCurrentPage(currentPage - 1);
  };

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
  const goToPokebag = () => {
    navigation.navigate('PokebagScreen', { uid: profile.uid });
  };
  useEffect(() => {
    onLogScreenView('DashboardScreen');
    getUserData();
    dispatch(getPokemon(nextPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPage]);

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

export default DashboardPokemonScreen;

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
