import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function PokebagScreen() {
  return (
    <View style={styles.pages}>
      <Text>PokebagScreen</Text>
    </View>
  );
}

export default PokebagScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
