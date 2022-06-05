import {
  Alert,
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils';
import { databaseRef } from '../../config/Firebase';
import { Header, Loading, PokemonCard } from '../../component';

function PokebagScreen() {
  const [pokebag, setPokebag] = useState([]);
  const [key, setKey] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokeBagData = () => {
    setLoading(true);
    const reference = databaseRef().ref('/pokeBag');
    reference.on('value', (snapshot) => {
      GetData(snapshot.val());
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPokeBagData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetData = (data) => {
    let keyFirebase = [];
    keyFirebase = Object.keys(data);
    setKey(keyFirebase);
    setPokebag(data);
  };

  return loading ? <Loading /> : (
    <View style={styles.pages}>
      <Header type="dashboard-profile" title="My Pokemon" />
      <FlatList
        data={key}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PokemonCard pokemon={pokebag[item]} onPress={() => Alert.alert('Tesss')} />}
      />
      <Text>PokebagScreen</Text>
    </View>
  );
}

export default PokebagScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
