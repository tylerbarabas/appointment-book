import React from 'react';
import './style.scss';
import Moment from 'moment';
import DeleteIcon from 'images/delete-icon.png';

export default class ApptTable extends React.Component {
    formatDate(d){
      return Moment(d).format('MM-DD-YYYY');
    }

    formatTime(t){
      return Moment(t).format('h:mm A');
    }

    deleteClicked(i){
      this.props.onRemoveAppointment(i);
    }

    getAppts(){
      let template = [];
      let { appts } = this.props;

      let sorted = [];
      for (let i=0;i<appts.size;i++) {
        let a = appts.get(i);
        sorted.push(a);
      }
      sorted.sort((a,b)=>Moment(`${a.date} ${a.start}`).valueOf() - Moment(`${b.date} ${b.start}`).valueOf());

      for (let i=0;i<sorted.length;i++) {
        let a = sorted[i];
        let name = a.name;
        let date = this.formatDate(a.date);
        let start = this.formatTime(`${a.date} ${a.start}`);
        let end = this.formatTime(`${a.date} ${a.end}`);

        template.push(
            <div className="appt-row" key={i}>
              <div className="appt-icon">
                <img src={DeleteIcon} onClick={this.deleteClicked.bind(this,i)}/>
              </div>
              <div className="appt-column">
                {name}
              </div>
              <div className="appt-column">
                {date}
              </div>
              <div className="appt-column">
                {start}
              </div>
              <div className="appt-column">
                {end}
              </div>               
            </div>
          );
      }

      return template;
    }

    getNoAppts(){
      return (
        <div className="appt-row">
          No appointments are currently scheduled!
        </div>
      );
    }

    getHeader(){
      return(
          <div className="appt-header" key="header">
            <div className="appt-icon">
            </div>
            <div className="appt-column">
              Name
            </div>
            <div className="appt-column">
              Date
            </div>
            <div className="appt-column">
              Start time
            </div>
            <div className="appt-column">
              End time
            </div>
          </div> 
      );
    }

    render(){
      let template = (this.props.appts.size > 0)?[this.getHeader(),this.getAppts()]:this.getNoAppts();
      return (
        <div className="appt-table">
         {template}
        </div>
      );
    }
}
