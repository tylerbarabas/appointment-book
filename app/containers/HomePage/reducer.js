/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { ADD_APPOINTMENT, REMOVE_APPOINTMENT } from './constants';

// The initial state of the App
const initialState = fromJS({
  appointments: []
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_APPOINTMENT:
      return state.update('appointments', a => a.push(action.appt));
    case REMOVE_APPOINTMENT:
      return state.update('appointments', a => a.delete(action.index));
    default:
      return state;
  }
}

export default homeReducer;
