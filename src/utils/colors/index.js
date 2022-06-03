const mainColors = {
  black1: '#112340',
  black2: 'rgba(0, 0, 0, 0.5)',
  grey1: '#7D8797',
  grey2: '#B1B7C2',
  grey3: '#E9E9E9',
  grey4: '#EDEEF0',
  grey5: '#B1B7C2',
  dark1: '#112340',
  dark2: '#495A75',
  red1: '#E06379',
  orange1: '#D18700',
};

export const colors = {
  warning: mainColors.red1,
  primary: 'white',
  secondary: mainColors.orange1,
  background: {
    primary: 'white',
    secondary: mainColors.orange1,
    black: mainColors.black1,
  },
  button: {
    primary: {
      background: mainColors.orange1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColors.black1,
    },
  },

  text: {
    primary: mainColors.black1,
    secondary: 'white',
    subtitle: mainColors.grey1,
  },

  disable: {
    background: mainColors.grey4,
    text: mainColors.grey5,
  },

  lineTextInput: mainColors.orange1,
  loadingBackground: mainColors.black2,
  menuInactive: mainColors.dark2,
  menuActive: mainColors.blue1,
  outlineInput: mainColors.grey2,
  border: mainColors.grey3,
};
