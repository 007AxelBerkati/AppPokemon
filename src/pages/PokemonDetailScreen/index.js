import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function PokemonDetailScreen() {
  return (
    <View style={styles.pages}>
      <Text>PokemonDetailScreen</Text>
    </View>
  );
}

export default PokemonDetailScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
