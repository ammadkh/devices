import React from 'react';
import {Text} from 'react-native';
import {Modal, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import colors from '../constants/colors';

export const AlertModal = ({visible, hideModal, message}) => {
  const appTheme = useSelector(state => state.mode.appTheme);

  const containerStyle = {
    backgroundColor: colors[appTheme].theme,
    padding: 20,
    margin: 50,
    borderRadius: 10,
  };
  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}>
      <Text
        style={{
          margin: 10,
          textAlign: 'center',
          fontSize: 16,
          color: colors[appTheme].gray,
          fontWeight: 'bold',
        }}>
        {message}
      </Text>
      <Button onPress={hideModal}>Ok</Button>
    </Modal>
  );
};
