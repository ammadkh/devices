import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Modal} from 'react-native-paper';
import {useSelector} from 'react-redux';
import colors from '../constants/colors';
import QRCode from 'react-native-qrcode-svg';

export const QRCodeModal = ({visibleQRCode, hideQRCode, data}) => {
  const appTheme = useSelector(state => state.mode.appTheme);
  console.log(JSON.stringify(data), 'data..');
  return (
    <Modal
      visible={visibleQRCode}
      onDismiss={hideQRCode}
      contentContainerStyle={{
        backgroundColor: colors[appTheme].theme,
        padding: 20,
        margin: 50,
        borderRadius: 10,
        alignItems: 'center',
      }}>
      <View style={styles(appTheme).container}>
        <QRCode value={JSON.stringify(data)} />
        <Text style={styles(appTheme).caption}>QR Code for {data?.model}</Text>
      </View>
    </Modal>
  );
};

const styles = appTheme =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    caption: {
      marginTop: 10,
      color: colors[appTheme].gray,
    },
  });
