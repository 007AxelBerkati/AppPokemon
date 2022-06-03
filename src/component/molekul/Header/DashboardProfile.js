import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '../../../utils';

function DashboardProfile({ title, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Icon name="logout" size={25} />
      </TouchableOpacity>
    </View>
  );
}

export default DashboardProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.secondary,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,

  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -5,
  },

  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },

  name: {
    fontSize: 23,
    color: colors.text.tertiary,
    fontFamily: fonts.secondary.pokemonStyle2,
    textShadowColor: colors.shadowText,
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 5 },
    marginTop: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

});
