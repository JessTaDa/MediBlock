import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


export default class CreatePrescription extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      name: "",
      medication: "",
      startDate: moment(),
      expirationDate: moment(),
      // account: this.props.account
      // instance: this.props.instance
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    // console.log("this.props@handleSubmit", this.props)
    // console.log("this.state@handleSubmit", this.state)
    // console.log("this.state.medication", this.state.medication)
      let result = await this.props.instance.createPrescription(this.state.name, this.state.account, this.state.startDate.unix(), this.state.expirationDate.unix(), {from: this.state.account})
      console.log("result", result)
  }

  handleChange(date) {
        this.setState({
          expirationDate: moment(date)
        });
      }

  render(props) {
    return (
      <div>
        <p>Create new prescription below:</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
            date:
            <input type="text" value={this.state.startDate} onChange={(event) => this.setState({startDate: event.target.value})} />
          </label>
          <br/>
          <label>
            expiration date:
            <DatePicker selected={this.state.expirationDate} onChange={(event) => this.handleChange(event.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
