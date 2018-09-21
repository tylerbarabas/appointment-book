import React from 'react';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';
import ErrorIcon from 'images/error-icon.png';

const dpStyles = {
  display: 'inline-block'
};

const defaultState = {
  name: '',
  date: Moment().format('YYYY-MM-DD'),
  start: '09:00',
  end: '10:00',
  errors: []
};

export default class ApptForm extends React.Component {
    constructor(){
      super();
      this.state = defaultState;
    }

    componentDidMount(){
      this.name = document.getElementById('name');
      this.date = document.getElementById('date');
      this.start = document.getElementById('start');
      this.end = document.getElementById('end');
    }

    formatDate(d){
      return Moment(d).format('YYYY-MM-DD');
    }

    submitForm(e){
      if (e !== undefined && e.preventDefault) e.preventDefault();

      let appt = {
        name: this.state.name,
        date: this.state.date,
        start: this.state.start,
        end: this.state.end
      };

      let errors = this.checkErrors(appt);

      if (errors.length < 1) {
        this.props.onAddAppointment(appt);
      }
      this.setState({errors});
    }

    resetForm(){
      this.setState(defaultState);
    }

    unHighlightInputs(){
      this.name.className = '';
      this.date.className = '';
      this.start.className = '';
      this.end.className = '';
    }

    highlightInput(elem){
        if (elem.className.indexOf('error') === -1) elem.className = `${elem.className} error`.trim();
    }

    checkErrors(appt){
      this.unHighlightInputs();

      let errors = [];
      let start = Moment(`${appt.date} ${appt.start}`);
      let end = Moment(`${appt.date} ${appt.end}`);

      if (appt.name.length < 1) {
        errors.push('Name cannot be empty.');
        this.highlightInput(this.name);
      }

      if (appt.start.length < 1) {
        errors.push('Start cannot be empty.');
        this.highlightInput(this.start); 
      }

      if (appt.end.length < 1) {
        errors.push('End cannot be empty.');
        this.highlightInput(this.end); 
      }

      if (start.diff(Moment()) < 0) {
        errors.push('Appointment cannot begin before now.');
        this.highlightInput(this.date);
        this.highlightInput(this.start);  
      }
 
      if (start.diff(end) > -1) {
        errors.push('Appointment cannot end before it begins.');
        this.highlightInput(this.end);  
      }

      if (this.checkConflicts(appt)) {
        errors.push('This appointment would cause a schedule conflict.');
        this.highlightInput(this.date);
        this.highlightInput(this.start);
        this.highlightInput(this.end);
      }

      return errors;
    }

    isBetween(time, range){
      if (time.diff(range.start) > -1 && time.diff(range.end) < 0) return true;
      return false;
    }

    checkConflicts(appt){
      let newStart = Moment(`${appt.date} ${appt.start}`);
      let newEnd = Moment(`${appt.date} ${appt.end}`);

      let { appts } = this.props;
      for (let i=0;i<appts.size;i+=1){
        let a = appts.get(i);
        let start = Moment(`${a.date} ${a.start}`);
        let end = Moment(`${a.date} ${a.end}`);

        let isStartBetween = this.isBetween(newStart, {start, end});
        let isEndBetween = this.isBetween(newEnd, {start, end});
        let revIsStartBetween = this.isBetween(start, {start: newStart, end: newEnd});
        let revIsEndBetween = this.isBetween(end, {start: newStart, end: newEnd});

        if (isStartBetween || isEndBetween || revIsStartBetween || revIsEndBetween) return true;
      }

      return false;
    }

    dateChange(date){
      this.setState({date: date.format('YYYY-MM-DD')});
    }

    fieldChange(e){
      let key = e.target.getAttribute('id');
      let value = e.target.value;

      this.setState({[key]: value});
    }

    getErrors(){
      let template = [];
      let { errors } = this.state;

      if (errors.length < 1) return;

      for (let i=0;i<errors.length;i+=1){
        template.push(<div key={i}><img src={ErrorIcon} className="error-icon" /> {errors[i]}</div>);
      } 
      return(
        <div className="errors">
          {template}
        </div>
      );
    }

    render(){
      return (
          <section className="appt-form">
            <strong>
              Add an appointment.
            </strong>
            {this.getErrors()}
            <form onSubmit={this.submitForm.bind(this)}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="John Smith" onChange={this.fieldChange.bind(this)} value={this.state.name } />
              <label htmlFor="date">Date</label>
              <div style={dpStyles}>
                <DatePicker id="date" selected={Moment(this.state.date)} onChange={this.dateChange.bind(this)}/>
              </div>
              <label htmlFor="start">Start</label>
              <input type="time" id="start" onChange={this.fieldChange.bind(this)} value={this.state.start} />
              <label htmlFor="end">End</label>
              <input type="time" id="end" onChange={this.fieldChange.bind(this)} value={this.state.end} />
              <button type="submit">Add</button>
            </form>
          </section>

      );
    }
}
