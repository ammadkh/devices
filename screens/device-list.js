import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Device} from '../components/device';
import DEVICES from '../data/dummy-data';
import colors from '../constants/colors';
import {useSelector} from 'react-redux';
import {IconButton, Portal, Provider} from 'react-native-paper';
import {DailyQuote} from '../components/daily-quote';
import {QRCodeModal} from '../components/qr-code';

export const DeviceList = ({navigation}) => {
  const [isModalVisible, setIsModelVisible] = useState(false);
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [deviceDetail, setDeviceDetail] = useState(null);

  const appTheme = useSelector(state => state.mode.appTheme);
  const availableDevices = useSelector(state => state.devices.devices);
  const hideModelHandler = () => {
    setDeviceId(null);
    setIsModelVisible(false);
  };

  const hideQRCode = () => {
    setDeviceDetail(null);
    setIsQRCodeVisible(false);
  };

  const showQRCode = detail => {
    setDeviceDetail(detail);
    setIsQRCodeVisible(true);
  };

  const showModalHandler = deviceId => {
    setDeviceId(deviceId);
    setIsModelVisible(true);
  };
  const onEditHandler = (itemId, model) => {
    navigation.navigate('Detail', {itemId, model});
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => navigation.navigate('Detail')}
          color={colors.white}
          style={styles(appTheme).m0}></IconButton>
      ),
      headerLeft: () => (
        <IconButton
          icon="menu"
          color={colors.white}
          onPress={() => navigation.toggleDrawer()}
          style={{marginLeft: -5, marginRight: 23, padding: 0}}></IconButton>
      ),
    });
  }, [navigation, appTheme]);

  return (
    <View style={styles(appTheme).container}>
      <Provider>
        <Portal>
          <DailyQuote
            deviceId={deviceId}
            visible={isModalVisible}
            hideModal={hideModelHandler}></DailyQuote>
          <QRCodeModal
            data={{...deviceDetail, imageUrl: ''}}
            visibleQRCode={isQRCodeVisible}
            hideQRCode={hideQRCode}></QRCodeModal>
        </Portal>
        {availableDevices && availableDevices.length ? (
          <FlatList
            data={availableDevices}
            renderItem={({item}) => (
              <Device
                device={item}
                showModel={showModalHandler}
                showQRCode={() => showQRCode(item)}
                onEdit={() => onEditHandler(item.id, item.model)}></Device>
            )}></FlatList>
        ) : (
          <View style={styles(appTheme).noDeviceContainer}>
            <View style={styles(appTheme).message}>
              <Image
                style={{width: 300, height: 300}}
                source={require('../assests/images/arabica-12.gif')}></Image>
              <Text style={styles(appTheme).txtMessage}>No Device Found.</Text>
            </View>
            <TouchableOpacity
              style={styles(appTheme).btn}
              onPress={() => navigation.navigate('Detail')}>
              <Text style={styles(appTheme).btnText}>ADD DEVICE</Text>
            </TouchableOpacity>
          </View>
        )}
      </Provider>
    </View>
  );
};

const styles = appTheme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[appTheme].background,
    },
    m0: {
      margin: 0,
    },
    message: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtMessage: {
      color: colors[appTheme].gray,
      fontWeight: 'bold',
    },
    btnAction: {
      marginHorizontal: 20,
      marginVertical: 30,
    },
    btn: {
      marginVertical: 50,
      padding: 15,
      backgroundColor: colors.primaryColor,
      width: 300,
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnText: {
      color: '#ffffff',
      textAlign: 'center',
      flexDirection: 'row',
    },
    noDeviceContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
