import DEVICES from '../../data/dummy-data';
import {
  ADD_DEVICE,
  DELETE_DEVICE,
  EDIT_DEVICE,
  FETCH_DEVICES,
} from '../actions/device';

const initState = {
  devices: [],
};

const deviceReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_DEVICES:
      return {...state, devices: action.devices};
    case ADD_DEVICE:
      const devices = [...state.devices];
      devices.push(action.device);
      return {...state, devices: devices};
    case EDIT_DEVICE:
      const updatedDevices = [...state.devices];
      const findIndex = updatedDevices.findIndex(
        item => item.id === action.device.id,
      );
      if (findIndex >= 0) {
        updatedDevices[findIndex] = action.device;
      }
      return {...state, devices: updatedDevices};
    case DELETE_DEVICE:
      const currentDevices = [...state.devices];
      const selectedDeviceIndex = currentDevices.findIndex(
        item => item.id === action.deviceId,
      );
      currentDevices.splice(selectedDeviceIndex, 1);
      return {...state, devices: currentDevices};
    default:
      return state;
  }
};

export default deviceReducer;
