import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function DashboardPokemonScreen() {
  console.log(props);
  const dummy = data;
  return (
    <View style={styles.pages}>
      <Text>Dashboard test sonar cloud</Text>
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
