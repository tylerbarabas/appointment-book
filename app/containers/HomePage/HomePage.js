/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import ApptTable from 'components/ApptTable';
import ApptForm from 'components/ApptForm';

export default class HomePage extends React.PureComponent {
  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <div className="home-page">
          <ApptForm appts={this.props.appointments} onAddAppointment={this.props.onAddAppointment.bind(this)}/> 
          <ApptTable appts={this.props.appointments} onRemoveAppointment={this.props.onRemoveAppointment.bind(this)} />
        </div>
      </article>
    );
  };
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onAddAppointment: PropTypes.func,
};
