import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import colors from '../constants/colors';
import {useDispatch} from 'react-redux';
import {toggleTheme} from '../store/actions/theme';

export const Mode = props => {
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    dispatch(toggleTheme());
  };
  const [active, setActive] = React.useState('');
  //   return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.switch}>
        <Switch
          color={colors.primaryColor}
          value={isSwitchOn}
          onValueChange={onToggleSwitch}></Switch>
        {isSwitchOn ? (
          <IconButton
            color="yellow"
            size={30}
            icon="white-balance-sunny"></IconButton>
        ) : (
          <IconButton
            color={colors.primaryColor}
            size={30}
            icon="weather-night"></IconButton>
        )}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
