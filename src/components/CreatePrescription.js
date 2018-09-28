import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreatePrescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      name: "",
      doctorAddress: "",
      patientAddress: "",
      medication: "",
      startDate: moment(),
      expirationDate: moment(),
      approvedByDoctor: true
    }
  }

  render(props) {
    return (
      <div>
        <p>Create new prescription below:</p>
        <form onSubmit={async (event) => {
          event.preventDefault()
          let result = await this.props.instance.createPrescription(this.state.name, this.props.doctorAddress, this.state.patientAddress, this.state.medication, this.state.startDate.unix(), this.state.expirationDate.unix(), this.state.approvedByDoctor, {from: this.props.doctorAddress})
          console.log("result", result)
        }}>
          <label>
            Patient Name:
            <input type="text" onChange={event => this.setState({name: event.target.value})} />
          </label>
          <br/>
          <br/>
          <label>
            doctorAddress:
            <input type="text" value={this.props.doctorAddress} />
          </label>
          <br/>
          <br/>
          <label>
            Patient Address:
            <input type="text" value={this.state.patientAddress} onChange={event => this.setState({patientAddress: event.target.value})} />
          </label>
          <br/>
          <br/>
          <label>
            Medication:
            <input type="text" onChange={event => this.setState({medication: event.target.value})} />
          </label>
          <br/>
          <br/>
          <label>
            Expiration date:
            <DatePicker selected={this.state.expirationDate} onChange={(date) => this.setState({expirationDate: moment(date)})}/>
          </label>
          <br/>
          <input type="submit" value="Create Prescription" />
        </form>
      </div>
    );
  }
}
