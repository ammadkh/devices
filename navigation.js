import React from 'react';
import {View, Text} from 'react-native';
import {DeviceList} from './screens/device-list';
import {Provider as PaperProvider, Button} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {DeviceDetail} from './screens/device-detail';
import colors from './constants/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Mode} from './components/mode';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ExportDevices} from './screens/export-devices';
import {ImportDevices} from './screens/import-devices';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const Navigation = () => {
  const appTheme = useSelector(state => state.mode.appTheme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryColor,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen
        name="Hom"
        component={DeviceList}
        options={{
          title: 'Devices',
        }}></Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={DeviceDetail}
        options={({route}) => ({title: route.params?.model})}></Stack.Screen>
    </Stack.Navigator>
  );
};

export const DrawerNavigation = () => {
  const appTheme = useSelector(state => state.mode.appTheme);
  return (
    <Drawer.Navigator
      drawerContent={props => <Mode {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: colors.light.grayLight,
        drawerInactiveTintColor: colors[appTheme].gray,
        drawerActiveBackgroundColor: colors.primaryColor,
        drawerStyle: {
          backgroundColor: colors[appTheme].theme,
        },
      }}>
      <Drawer.Screen
        name="Devices"
        component={Navigation}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon
              name="list"
              color={focused ? colors.light.grayLight : colors[appTheme].gray}
              size={16}
              style={{padding: 0, margin: 0}}></Icon>
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Import"
        component={ImportDevices}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              name="file-import"
              color={focused ? colors.light.grayLight : colors[appTheme].gray}
              size={16}
              style={{padding: 0, margin: 0}}></Icon>
          ),
          headerStyle: {
            backgroundColor: colors.primaryColor,
          },
          headerTintColor: colors.white,
        }}
      />
      <Drawer.Screen
        name="Export"
        component={ExportDevices}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              name="file-export"
              color={focused ? colors.light.grayLight : colors[appTheme].gray}
              // color={colors.light.grayLight}
              size={16}
              style={{padding: 0, margin: 0}}></Icon>
          ),
          headerStyle: {
            backgroundColor: colors.primaryColor,
          },
          headerTintColor: colors.white,
        }}
      /> */}
    </Drawer.Navigator>
  );
};
