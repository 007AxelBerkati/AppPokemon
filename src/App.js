import React from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Loading } from './component';
import { Persistore, Store } from './redux';
import Router from './router';
import { colors } from './utils';

function MainApp() {
  const stateGlobal = useSelector((state) => state.dataGlobal);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.secondary} />
      <Router />
      <FlashMessage position="top" />
      {stateGlobal.isLoading && <Loading />}
    </>
  );
}
function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}

export default App;
