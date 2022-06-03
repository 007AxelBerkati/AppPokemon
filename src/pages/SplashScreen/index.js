import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
import {
  colors, fonts, onLogScreenView, windowHeight, windowWidth,
} from '../../utils';
import { IconApp } from '../../assets/image';

function SplashScreen({ navigation }) {
  useEffect(() => {
    onLogScreenView('SplashScreen');
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 3000);

    // const subscriber = auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     setTimeout(() => {
    //       navigation.replace('DashboardScreen');
    //     }, 3000);
    //   } else {
    //     setTimeout(() => {
    //       navigation.replace('LoginScreen');
    //     }, 3000);
    //   }
    // });

    // return subscriber();
  }, [navigation]);
  return (
    <View style={styles.page}>
      <Image style={styles.image} source={IconApp} />
      <Text style={styles.title}>MyChatting</Text>
      <Text style={styles.nickname}>Axel Berkati</Text>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background.secondary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary[800],
  },

  image: {
    height: windowHeight * 0.17,
    width: windowWidth * 0.3,
  },

  nickname: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary[800],
    position: 'absolute',
    bottom: 19,
  },
});
