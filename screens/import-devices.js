// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {Button, Modal, Portal, Provider} from 'react-native-paper';
// import {useDispatch, useSelector} from 'react-redux';
// import colors from '../constants/colors';
// import {AlertModal} from '../shared/alert-modal';
// import {fetchDevices, FETCH_DEVICES} from '../store/actions/device';
// import RNFS from 'react-native-fs';

// export const ImportDevices = ({navigation}) => {
//   const dispatch = useDispatch();
//   const appTheme = useSelector(state => state.mode.appTheme);
//   const [visible, setVisible] = React.useState(false);
//   const [numOfDevices, setNumberOfDevices] = useState(0);

//   const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);

//   const fileRead = () => {
//     // get a list of files and directories in the main bundle
//     RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//       .then(result => {
//         console.log('GOT RESULT', result);

//         // stat the first file
//         return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//       })
//       .then(statResult => {
//         if (statResult[0].isFile()) {
//           // if we have a file, read it
//           return RNFS.readFile(statResult[1], 'utf8');
//         }

//         return 'no file';
//       })
//       .then(contents => {
//         // log the file contents
//         console.log(contents);
//         const data = JSON.parse(contents);
//         if (!data || !data.length) {
//           setNumberOfDevices(0);
//           showModal(true);
//         } else {
//           dispatch(fetchDevices(data));
//           setNumberOfDevices(data.length);
//           showModal(true);
//         }
//         console.log(JSON.parse(contents), 'df');
//       })
//       .catch(err => {
//         console.log(err.message, err.code);
//       });
//   };

//   return (
//     <Provider>
//       <View style={styles(appTheme).container}>
//         <Portal>
//           <AlertModal
//             visible={visible}
//             hideModal={hideModal}
//             message={
//               numOfDevices
//                 ? `${numOfDevices} device(s) successfully imported!`
//                 : 'No device to import.'
//             }></AlertModal>
//         </Portal>
//         <View style={styles(appTheme).imgContainer}>
//           <View
//             style={{
//               width: 300,
//               height: 300,
//               borderRadius: 150,
//               backgroundColor: 'pink',
//             }}>
//             <Image
//               style={styles(appTheme).img}
//               source={require('../assests/images/jungle-upload-1.png')}></Image>
//           </View>
//         </View>
//         <TouchableOpacity style={styles(appTheme).btn} onPress={fileRead}>
//           <View>
//             <Text style={{color: '#ffffff'}}>Import data</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </Provider>
//   );
// };

// const styles = appTheme =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: colors[appTheme].background,
//     },
//     imgContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: colors[appTheme].background,
//     },
//     m0: {
//       margin: 0,
//     },
//     img: {
//       width: '100%',
//       height: '100%',
//     },
//     btn: {
//       marginVertical: 50,
//       padding: 15,
//       backgroundColor: colors.primaryColor,
//       width: '80%',
//       height: 50,
//       borderRadius: 10,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });
