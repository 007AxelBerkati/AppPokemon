import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors, fonts } from '../../../utils';

function Input2({
  onChangeText, value, label, error, onBlur, cannotEdited, secureTextEntry, leftIcon,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        label={label}
        onBlur={onBlur}
        mode="outlined"
        activeOutlineColor={colors.lineTextInput}
        outlineColor={cannotEdited ? colors.disable.background : colors.outlineInput}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        left={(
          <TextInput.Icon name={leftIcon} />
            )}
        right={secureTextEntry ? (
          <TextInput.Icon
            name={passwordVisible ? 'eye' : 'eye-off'}
            onPress={() => setPasswordVisible(!passwordVisible)}
            color={passwordVisible ? colors.background.secondary : colors.warning}
          />
        ) : null}

      />
    </View>
  );
}

export default Input2;

const styles = StyleSheet.create({
  input: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.secondary,
  },
});