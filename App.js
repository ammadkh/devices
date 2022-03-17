import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStore, combineReducers} from 'redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerNavigation} from './navigation';
import deviceReducer from './store/reducers/device';
import {Provider} from 'react-redux';
import themeReducer from './store/reducers/theme';

const rootReducer = combineReducers({
  devices: deviceReducer,
  mode: themeReducer,
});

const store = createStore(rootReducer);

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <DrawerNavigation />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};
