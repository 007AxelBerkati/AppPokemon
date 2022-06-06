import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { colors } from '../../../utils';
import { ButtonComponent } from '../../atoms';

export default function Footer({
  dataPokemon, onHandleNext, onHandlePrevious, currentPage,
}) {
  console.log('Footer');
  return (
    <View style={styles.footerContent}>

      <ButtonComponent
        disable={currentPage === 1}
        title="Previously"
        onPress={() => onHandlePrevious()}
        style={styles.buttonPagination}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>{currentPage}</Text>
      </View>
      <ButtonComponent
        disabled={dataPokemon?.hasMore}
        onPress={() => onHandleNext()}
        style={styles.buttonPagination}
        title="Next"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  buttonPagination: {
    width: '30%',
  },

});
