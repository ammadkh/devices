import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  Card,
  Avatar,
  Divider,
  IconButton,
  Provider,
  Portal,
} from 'react-native-paper';
import colors from '../constants/colors';
import {useSelector} from 'react-redux';

export const Device = ({device, onEdit, showModel, showQRCode}) => {
  const appTheme = useSelector(state => state.mode.appTheme);
  const [showNote, setShowNote] = useState(null);

  return (
    <Provider>
      <View style={styles(appTheme).container}>
        <Card style={styles(appTheme).card}>
          <View style={styles(appTheme).detail}>
            <Avatar.Image
              style={styles(appTheme).img}
              // size={74}
              source={{uri: device.imageUrl}}></Avatar.Image>
            <View style={styles(appTheme).desc}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  paddingRight: 5,
                }}>
                <Text style={styles(appTheme).title}>{device.model}</Text>
                <Text style={styles(appTheme).os}>{device.os}</Text>
              </View>
              <Text style={styles(appTheme).txt}>{device.currentOwner}</Text>
              {device.notes ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    // justifyContent: 'space-between',
                    paddingRight: 5,
                  }}>
                  <Text style={styles(appTheme).txt}>Note</Text>
                  <IconButton
                    style={{margin: 0}}
                    size={14}
                    color={colors.primaryColor}
                    onPress={() => setShowNote(prevState => !prevState)}
                    icon={
                      showNote
                        ? 'arrow-up-drop-circle-outline'
                        : 'arrow-down-drop-circle-outline'
                    }></IconButton>
                </View>
              ) : null}
              {showNote ? (
                <Text style={styles(appTheme).txt}>{device.notes}</Text>
              ) : null}
            </View>
          </View>
          <Divider />
          <View style={styles(appTheme).actions}>
            <IconButton
              style={styles(appTheme).btn}
              size={14}
              color={colors.accentColor}
              onPress={() => showModel(device?.id)}
              icon="trash-can-outline"></IconButton>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <IconButton
                style={styles(appTheme).btn}
                color={colors.primaryColor}
                size={14}
                onPress={showQRCode}
                icon="qrcode-plus"></IconButton>
              <IconButton
                style={styles(appTheme).btn}
                color={colors.primaryColor}
                size={14}
                onPress={onEdit}
                icon="pencil"></IconButton>
            </View>
          </View>
        </Card>
      </View>
    </Provider>
  );
};

const styles = appTheme =>
  StyleSheet.create({
    container: {
      margin: 10,
    },
    card: {
      borderColor: colors[appTheme].grayLight,
      borderWidth: 2,
      elevation: 5,
      padding: 5,
      borderRadius: 10,
      backgroundColor: colors[appTheme].theme,
    },
    detail: {
      flexDirection: 'row',
      // alignItems: 'center',
      padding: 5,
    },
    os: {
      fontSize: 10,
      color: colors[appTheme].gray,
    },
    img: {
      marginRight: 15,
    },
    desc: {
      flex: 1,
    },
    title: {
      fontSize: 19,
      fontWeight: 'bold',
      color: colors.primaryColor,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    btn: {
      padding: 0,
    },
    txt: {
      color: colors[appTheme].gray,
    },
  });
