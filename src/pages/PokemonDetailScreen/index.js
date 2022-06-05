import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Image, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { pokeBall } from '../../assets';
import {
  About, BaseStats, Loading, Moves,
} from '../../component';
import { getDetail } from '../../redux/action/DetailAction';
import {
  colors, fonts, pokemonColors, windowWidth,
} from '../../utils';

function PokemonDetailScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  const pokemonDetail = useSelector((state) => state.dataPokemonDetail.pokemonDetail);
  const loading = useSelector((state) => state.dataPokemonDetail.loading);
  const [menu, setMenu] = useState('About');
  const pokemonColor = pokemonColors[pokemonDetail.type];
  const spinValue = useState(new Animated.Value(0))[0];

  // First set up animation
  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    ),
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    dispatch(getDetail(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const bgStyles = { ...styles.container, backgroundColor: pokemonColor };

  const listMenuInfo = [
    {
      option: 'About',
    },

    {
      option: 'Base Stats',
    },

    {
      option: 'Moves',
    },
  ];

  const setMenuOption = (goMenu) => setMenu(goMenu);

  const btnActive = {
    color: pokemonColor,
  };

  return loading ? <Loading /> : (
    <View style={bgStyles}>
      <StatusBar backgroundColor={pokemonColor} />
      <View style={styles.iconButton}>
        <View style={{ flex: 1 }}>
          <IconButton icon="arrow-left" color={colors.primary} onPress={() => navigation.goBack()} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
          <View style={{ flexDirection: 'column' }}>
            <IconButton icon="bag-checked" color={colors.primary} />
            <Text style={{
              fontFamily: fonts.primary[600],
              color: colors.text.secondary,
              textAlign: 'center',
              marginTop: -10,
              fontSize: 12,
            }}
            >
              Catch
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.text__titleDetail}>{pokemonDetail?.name}</Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <View style={{
          flexDirection: 'row', flexWrap: 'wrap', marginLeft: 20, marginRight: 30,
        }}
        >
          {pokemonDetail?.types
            ? pokemonDetail?.types.map((type, idx) => (
              <View
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                style={{
                  backgroundColor: colors.text.secondary, opacity: 0.2, borderRadius: 15, alignSelf: 'baseline', margin: 5,
                }}
              >
                <Text style={{
                  color: colors.text.primary, padding: 5, opacity: 1, fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginRight: 10,
                }}
                >
                  {type.type.name}
                </Text>
              </View>
            ))
            : <View />}

        </View>
        <View style={{ paddingRight: 20 }}>
          <Text style={{
            color: colors.text.secondary, opacity: 0.8, fontWeight: 'bold', fontSize: 40,
          }}
          >
            #
            {`${pokemonDetail?.id}`.padStart(3, 0)}
          </Text>
        </View>
      </View>
      <View style={{
        alignItems: 'center',
        elevation: 5,
        zIndex: 2,
      }}
      >
        <Animated.Image
          source={pokeBall}
          style={{
            position: 'absolute',
            overflow: 'visible',
            opacity: 0.2,
            right: -50,
            top: -160,
            transform: [{ rotate: spin }],
          }}
        />
        <Image
          style={styles.detail__imagePokemon}
          source={{ uri: pokemonDetail?.sprites?.other['official-artwork'].front_default }}
        />
      </View>
      <View style={styles.container__moves}>
        <SafeAreaView style={styles.detail__containerInfo}>
          <View style={styles.detail__listTab}>
            {
                    listMenuInfo.map((e) => (
                      <TouchableOpacity
                        key={e.option}
                        style={[styles.detail__btnTab,
                          menu === e.option && {
                            borderBottomWidth: 1,
                            borderBottomColor: pokemonColor,
                          }]}
                        onPress={() => setMenuOption(e.option)}
                      >
                        <Text style={[styles.detail__textTab, menu === e.option && btnActive]}>
                          {e.option}
                        </Text>
                      </TouchableOpacity>
                    ))
                }
          </View>
          <View>
            <View style={{ paddingBottom: 80 }}>
              {menu === 'Moves'
                ? <Moves item={pokemonDetail} /> : <View />}

              {menu === 'About'
                ? <About item={pokemonDetail} /> : <View />}

              {menu === 'Base Stats'
                ? <BaseStats item={pokemonDetail} /> : <View />}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

export default PokemonDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    // padding: 10,
  },

  container__moves: {
    top: 120,
    backgroundColor: colors.text.secondary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    paddingTop: 70,
    zIndex: 1,
  },

  text__titleDetail: {
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: fonts.primary[800],
    color: colors.text.secondary,
  },

  detail__imagePokemon: {
    height: 200,
    width: 200,
    position: 'absolute',
  },

  detail__containerInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },

  detail__listTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },

  detail__btnTab: {
    width: windowWidth / 3.5,
    flexDirection: 'row',
    borderBottomColor: colors.outlineInput,
    borderBottomWidth: 0.5,
    padding: 10,
    justifyContent: 'center',
  },

  detail__textTab: {
    fontSize: 18,
    color: colors.outlineInput,
    fontWeight: 'bold',
  },

  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },

  iconButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 13,
    marginVertical: 13,
  },

});

// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDetail } from '../../redux/action/DetailAction';
// import { pokemonColors } from '../../utils';

// function PokemonDetailScreen({ route }) {
//   const dispatch = useDispatch();
//   const { id } = route.params;
//   const pokemonDetail = useSelector((state) => state.dataPokemonDetail.pokemon);
//   const loading = useSelector((state) => state.dataPokemonDetail.loading);

//   const pokemonColor = pokemonColors[pokemonDetail.types['0'].type.name];

//   useEffect(() => {
//     dispatch(getDetail(id));
//     console.log('pokemonDetail : ', pokemonDetail);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <View>
//       <Text>PokemonDetailScreen</Text>
//     </View>
//   );
// }

// export default PokemonDetailScreen;

// const styles = StyleSheet.create({});
