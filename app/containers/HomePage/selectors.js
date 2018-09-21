/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectAppointments = () => createSelector(
  selectHome,
  (homeState) => homeState.get('appointments')
);

export {
  selectHome,
  makeSelectAppointments,
};
