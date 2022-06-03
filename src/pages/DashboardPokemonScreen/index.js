import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComponent, Header } from '../../component';

function DashboardPokemonScreen({ navigation }) {
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
