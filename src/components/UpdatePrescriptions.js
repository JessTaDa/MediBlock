import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class UpdatePrescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      name: "",
      doctorAddress: "",
      patientAddress: 123,
      medication: "",
      startDate: moment(),
      expirationDate: moment(),
      validity: true
    }
  }

  render(props) {
    return (
      <div>
        <p>Update your prescription below:</p>
        <form onSubmit={async (event) => {
          event.preventDefault()
          let result = await this.props.instance.updatePrescription(this.state.name, this.props.doctorAddress, this.state.patientAddress, this.state.medication, this.state.startDate, this.state.expirationDate, this.state.validity, {from: this.props.doctorAddress})
          console.log("updatePrescription", result)
        }}>
          <label>
            name:
            <input type="text" onChange={event => this.setState({name: event.target.value})} />
          </label>
          <br/>
          <label>
            doctorAddress:
            <input type="text" value={this.props.doctorAddress} />
          </label>
          <br/>
          <label>
            patientAddress:
            <input type="text" value={this.state.patientAddress} onChange={event => this.setState({patientAddress: event.target.value})} />
          </label>
          <br/>
          <label>
            medication:
            <input type="text" onChange={event => this.setState({medication: event.target.value})} />
          </label>
          <br/>
          <label>
            expiration date:
            <DatePicker selected={this.state.expirationDate} onChange={(date) => this.setState({expirationDate: moment(date)})}/>
          </label>

          <input type="submit" value="UUPDATE Prescription" />
        </form>
      </div>
    );
  }
}
