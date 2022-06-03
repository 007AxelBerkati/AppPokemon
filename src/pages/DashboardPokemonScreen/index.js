import axios from 'axios';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonComponent, Header } from '../../component';
import { GET_POKEMON_API } from '../../config';

function DashboardPokemonScreen({ navigation }) {
  // const [nextPage, setNextPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);

  const fetchPokemon = () => axios.get(`${GET_POKEMON_API}`).then(
    (res) => console.log('response', res.data),
  );
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <View style={styles.pages}>
      <Header type="dashboard-profile" title="My Pokemon" />
      <Text>Dashboard test husky eslint</Text>
      <ButtonComponent icon="bag-personal" type="floating-btn" onPress={() => navigation.navigate('PokebagScreen')} />
    </View>
  );
}

export default DashboardPokemonScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,

  },
});
