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
      medication: "",
      startDate: moment(),
      expirationDate: moment(),
    }
  }

  render(props) {
    return (
      <div>
        <p>Create new prescription below:</p>
        <form onSubmit={async (event) => {
          event.preventDefault()
          let result = await this.props.instance.createPrescription(this.state.name, this.props.account, this.state.medication, this.state.startDate.unix(), this.state.expirationDate.unix(), {from: this.props.account})
          console.log("result", result)
        }}>
          <label>
            name:
            <input type="text" onChange={event => this.setState({name: event.target.value})} />
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
          <input type="submit" value="Create Prescription" />
        </form>
      </div>
    );
  }
}
