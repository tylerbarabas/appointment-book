import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { addAppointment, removeAppointment } from './actions';
import { makeSelectAppointments } from './selectors';
import reducer from './reducer';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  onAddAppointment: (appt) => {
    dispatch(addAppointment(appt));
  },
  onRemoveAppointment: (index) => {
    dispatch(removeAppointment(index));
  },
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  appointments: makeSelectAppointments(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(withReducer, withConnect)(HomePage);
export { mapDispatchToProps };
