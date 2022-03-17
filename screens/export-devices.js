// import React, {useState} from 'react';
// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import {IconButton, Provider, Portal} from 'react-native-paper';
// import {useSelector} from 'react-redux';
// import colors from '../constants/colors';
// import {AlertModal} from '../shared/alert-modal';
// import RNFS from 'react-native-fs';

// export const ExportDevices = ({navigation}) => {
//   const [visible, setVisible] = React.useState(false);
//   const [numOfDevices, setNumberOfDevices] = useState(0);

//   const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);
//   const appTheme = useSelector(state => state.mode.appTheme);
//   const devices = useSelector(state => state.devices.devices);
//   const fileCreation = () => {
//     if (!devices || !devices.length) {
//       showModal(true);
//       setNumberOfDevices(0);
//     }
//     var path = RNFS.DocumentDirectoryPath + '/devices.txt';
//     console.log(path, 'pathh..');
//     // write the file
//     RNFS.writeFile(path, JSON.stringify(devices), 'utf8')
//       .then(success => {
//         setNumberOfDevices(devices.length);
//         showModal(true);
//         console.log('FILE WRITTEN!');
//       })
//       .catch(err => {
//         console.log(err.message);
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
//                 ? `${numOfDevices} device(s) successfully exported!`
//                 : 'Add atleast one device to export.'
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
//               source={require('../assests/images/jungle-downloading-2.png')}></Image>
//           </View>
//         </View>
//         <TouchableOpacity style={styles(appTheme).btn} onPress={fileCreation}>
//           <View>
//             <Text style={{color: '#ffffff'}}>Export data</Text>
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
