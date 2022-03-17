export const ADD_DEVICE = 'ADD_DEVICE';
export const EDIT_DEVICE = 'EDIT_DEVICE';
export const DELETE_DEVICE = 'DELETE_DEVICE';
export const FETCH_DEVICES = 'FETCH_DEVICES';

export const addDevice = device => {
  return {type: ADD_DEVICE, device};
};

export const fetchDevices = devices => {
  return {type: FETCH_DEVICES, devices};
};

export const editDevice = device => {
  return {type: EDIT_DEVICE, device};
};

export const deleteDevice = deviceId => {
  return {type: DELETE_DEVICE, deviceId};
};
