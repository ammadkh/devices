import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Portal, Modal, Button, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as axios from 'axios';
import colors from '../constants/colors';
import {deleteDevice} from '../store/actions/device';

export const DailyQuote = ({visible, hideModal, deviceId}) => {
  const appTheme = useSelector(state => state.mode.appTheme);
  const dispatch = useDispatch();
  const [quote, setQuote] = useState(null);
  const getQuote = async () => {
    const response = await axios.get('https://zenquotes.io/api/today');
    const data = response.data[0];
    setQuote(data);
  };
  useEffect(() => {
    if (visible) {
      getQuote();
    }
  }, [visible, setQuote]);
  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={{
        backgroundColor: colors[appTheme].theme,
        padding: 20,
        margin: 20,
        borderRadius: 10,
      }}>
      <Text style={styles.title}>Today's Quote</Text>
      <Text style={{color: colors[appTheme].gray}}>{quote?.q}</Text>
      <Text style={styles.author}>-{quote?.a}</Text>
      <Divider />
      <Text style={styles.warning}>
        Are you sure you want to delete this device?
      </Text>
      <Divider />
      <View style={styles.actionbtn}>
        <Button style={styles.btn} onPress={hideModal}>
          <Text style={{color: colors.accentColor}}>Cancel</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => {
            dispatch(deleteDevice(deviceId));
            hideModal();
          }}>
          <Text style={{color: colors.accentColor}}>Yes</Text>
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.accentColor,
  },
  btn: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: colors.primaryColor,
  },
  warning: {
    color: colors.primaryColor,
    fontSize: 18,
    marginBottom: 12,
  },
  author: {
    textAlign: 'right',
    color: colors.accentColor,
    marginBottom: 8,
  },
});
