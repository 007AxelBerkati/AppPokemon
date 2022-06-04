import React, { useEffect } from 'react';
import {
  FlatList, StyleSheet, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonComponent, Header } from '../../component';
import PokemonCard from '../../component/molekul/PokemonCard';
import { getPokemon } from '../../redux';

function DashboardPokemonScreen({ navigation }) {
  const dispatch = useDispatch();

  const dataPokemon = useSelector((state) => state.dataPokemon);
  // const [nextPage, setNextPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getPokemon(0));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Header type="dashboard-profile" title="My Pokemon" />
      <FlatList
        data={dataPokemon.pokemon}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} onPress={() => navigation.navigate('PokemonDetailScreen', item)} />}
      />
      <ButtonComponent icon="bag-personal" type="floating-btn" onPress={() => navigation.navigate('PokebagScreen')} />
    </View>
  );
}

export default DashboardPokemonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    // padding: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

});
