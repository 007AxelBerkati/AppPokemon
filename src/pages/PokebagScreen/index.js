import React, { useEffect, useState } from 'react';
import {
  FlatList, StyleSheet, View,
} from 'react-native';
import {
  Button, Dialog, Paragraph, Portal,
} from 'react-native-paper';
import { Header, Loading, PokemonCard } from '../../component';
import { databaseRef } from '../../config/Firebase';
import { colors } from '../../utils';

function PokebagScreen({ navigation }) {
  const [pokebag, setPokebag] = useState([]);
  const [key, setKey] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');

  const showDialog = (item) => {
    setId(item);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const fetchPokeBagData = async () => {
    setLoading(true);
    const reference = await databaseRef().ref('/pokeBag');
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

  const removePokemon = async () => {
    try {
      await databaseRef().ref(`/pokeBag/${id}`).remove();
      fetchPokeBagData();
      hideDialog();
    } catch (error) {
      // Alert.alert('Oops', error);
    }
  };

  const detailPokemon = () => {
    navigation.navigate('PokemonDetailScreen', {
      id: pokebag[id].id,
    });
    hideDialog();
  };

  return loading ? <Loading /> : (
    <View style={styles.pages}>
      <Header type="dashboard-profile" title="My Pokemon" />
      <FlatList
        data={key}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={pokebag[item]}
            onPress={() => showDialog(item)}
          />
        )}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Want to Remove
              {' '}
              {pokebag[id]?.name}
              {' '}
              or see more detail?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Content style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Dialog.Actions>
              <Button onPress={removePokemon}>Remove</Button>
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={detailPokemon}>Detail</Button>
            </Dialog.Actions>
            {/* <IconButton
              icon="cancel"
              style={{ position: 'absolute', top: -120 }}
              color={colors.warning}
              onPress={hideDialog}
            /> */}
          </Dialog.Content>

        </Dialog>
      </Portal>
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
