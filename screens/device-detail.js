import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TextInput, Button, IconButton} from 'react-native-paper';
import {Formik, useFormikContext} from 'formik';
import DEVICES from '../data/dummy-data';
import {useDispatch, useSelector} from 'react-redux';
import {Device} from '../models/device';
import {addDevice, editDevice} from '../store/actions/device';
import colors from '../constants/colors';
import {launchCamera} from 'react-native-image-picker';
import {imageString} from '../image';
import * as yup from 'yup';

const customTheme = appTheme => ({
  colors: {
    text: colors[appTheme].gray,
    placeholder: appTheme === 'dark' ? colors.primaryColor : colors.light.gray,
  },
});

const activeOutlineClr = appTheme =>
  appTheme === 'light' ? colors.primaryColor : colors.light.grayLight;
export const DeviceDetail = ({route, navigation}) => {
  const formRef = useRef(null);
  const appTheme = useSelector(state => state.mode.appTheme);
  const dispatch = useDispatch();
  const itemId = route.params?.itemId;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          disabled={!formRef.current.isValid}
          icon="content-save"
          onPress={formRef.current.handleSubmit}
          color={colors.white}></IconButton>
      ),
    });
  }, [navigation, formRef]);

  let selectedDevice;
  if (itemId) {
    selectedDevice = useSelector(state => state.devices.devices).find(
      device => device.id === itemId,
    );
  }

  const imgPicker = async handleChange => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      includeBase64: true,
    });
    if (result.didCancel) {
      return;
    }
    handleChange(result.assets[0].uri);
  };

  const validationSchema = yup.object().shape({
    model: yup.string().required('Device model is required.'),
    os: yup.string().required('Operating system is required.'),
    currentOwner: yup.string().required('Current owner is required.'),
  });

  return (
    <KeyboardAvoidingView
      style={styles(appTheme).container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Formik
            validationSchema={validationSchema}
            innerRef={formRef}
            initialValues={{
              model: selectedDevice ? selectedDevice.model : '',
              os: selectedDevice ? selectedDevice.os : '',
              currentOwner: selectedDevice ? selectedDevice.currentOwner : '',
              notes: selectedDevice ? selectedDevice.notes : '',
              imageUrl: selectedDevice
                ? selectedDevice.imageUrl
                : imageString.data,
            }}
            onSubmit={values => {
              if (selectedDevice) {
                dispatch(editDevice({...values, id: selectedDevice.id}));
              } else {
                dispatch(
                  addDevice({
                    ...values,
                    id: Math.floor(Math.random() * 100).toString(),
                  }),
                );
              }
              navigation.goBack();
            }}>
            {({handleChange, values, errors, touched, setFieldTouched}) => (
              <View>
                <View
                  style={{
                    alignItems: 'center',
                    marginVertical: 30,
                  }}>
                  <View
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: 100,
                      overflow: 'hidden',
                    }}>
                    <ImageBackground
                      resizeMode="cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                      source={{
                        uri: values.imageUrl,
                      }}>
                      <IconButton
                        icon="camera"
                        size={25}
                        onPress={async () =>
                          await imgPicker(handleChange('imageUrl'))
                        }
                        color={colors.white}
                        style={{
                          margin: 0,
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          width: '100%',
                        }}></IconButton>
                    </ImageBackground>
                  </View>
                </View>
                <View style={styles(appTheme).inputContainer}>
                  <TextInput
                    style={styles(appTheme).txtInput}
                    label="Model"
                    value={values.model}
                    activeOutlineColor={activeOutlineClr(appTheme)}
                    theme={customTheme(appTheme)}
                    onChangeText={handleChange('model')}
                    onBlur={() => setFieldTouched('model')}
                    mode="outlined"></TextInput>
                  {touched.model && errors.model && (
                    <Text style={styles(appTheme).errorMessage}>
                      {errors.model}
                    </Text>
                  )}
                </View>
                <View style={styles(appTheme).inputContainer}>
                  <TextInput
                    style={styles(appTheme).txtInput}
                    activeOutlineColor={activeOutlineClr(appTheme)}
                    theme={customTheme(appTheme)}
                    label="Operation System"
                    value={values.os}
                    onChangeText={handleChange('os')}
                    onBlur={() => setFieldTouched('os')}
                    mode="outlined"></TextInput>
                  {touched.os && errors.os && (
                    <Text style={styles(appTheme).errorMessage}>
                      {errors.os}
                    </Text>
                  )}
                </View>
                <View style={styles(appTheme).inputContainer}>
                  <TextInput
                    style={styles(appTheme).txtInput}
                    activeOutlineColor={activeOutlineClr(appTheme)}
                    theme={customTheme(appTheme)}
                    label="Current Owner"
                    value={values.currentOwner}
                    onChangeText={handleChange('currentOwner')}
                    mode="outlined"></TextInput>
                  {touched.currentOwner && errors.currentOwner && (
                    <Text style={styles(appTheme).errorMessage}>
                      {errors.currentOwner}
                    </Text>
                  )}
                </View>
                <View style={styles(appTheme).inputContainer}>
                  <TextInput
                    style={styles(appTheme).txtInput}
                    activeOutlineColor={activeOutlineClr(appTheme)}
                    theme={customTheme(appTheme)}
                    label="Notes"
                    value={values.notes}
                    onChangeText={handleChange('notes')}
                    numberOfLines={3}
                    multiline={true}
                    mode="outlined"></TextInput>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = appTheme =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: colors[appTheme].background,
      flex: 1,
      color: '#ffffff',
      //alignItems: 'center',
    },
    inputContainer: {
      margin: 5,
    },
    txtInput: {
      backgroundColor: colors[appTheme].theme,
    },
    errorMessage: {
      color: colors.accentColor,
      fontSize: 12,
    },
  });
