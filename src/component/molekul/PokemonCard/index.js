import React from 'react';
import {
  Text, View, Image, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import { pokemonColors } from '../../../utils';

export default function PokemonCard({ pokemon, onPress }) {
  const pokemonColor = pokemonColors[pokemon.type];
  const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={styles.card}>
        <View style={styles.card__spacing}>
          <View style={bgStyles}>
            <Image
              style={styles.card__imagePokemon}
              source={{ uri: pokemon.imgUrl }}
            />
            <Text style={styles.card__name}>{pokemon.name}</Text>
            {
                            pokemon.types.map((type, idx) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <View key={idx} style={styles.card__typeContainer}>
                                <Text style={styles.card__typeText}>{type.type.name}</Text>
                              </View>
                            ))
                        }
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card__imagePokemon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },

  card: {
    flex: 1,
    height: 140,
  },
  card__typeText: {
    color: 'black',
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    opacity: 1,
  },
  card__typeContainer: {
    backgroundColor: '#fff',
    opacity: 0.2,
    borderRadius: 10,
    alignSelf: 'baseline',
    margin: 1,
  },
  card__spacing: {
    flex: 1,
    padding: 5,
  },
  card__name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
  },

  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
});
