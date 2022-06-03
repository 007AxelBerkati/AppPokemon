import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function DashboardPokemonScreen() {
  return (
    <View style={styles.pages}>
      <Text>Dashboard test husky eslint</Text>
    </View>
  );
}

export default DashboardPokemonScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
