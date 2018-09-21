import { ADD_APPOINTMENT, REMOVE_APPOINTMENT } from './constants';

export function addAppointment(appt) {
  return {
    type: ADD_APPOINTMENT,
    appt
  };
};

export function removeAppointment(index){
  return{
    type: REMOVE_APPOINTMENT,
    index
  };
};
