import React from 'react';
import moment from 'moment';

export default class DisplayPrescriptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      doctorAddress: null,
      patientAddress: null,
      medication: "",
      startDate: null,
      expirationDate: null,
      isValid: null
    }
  }

  async componentDidMount() {
    let prescription = await this.props.instance.getPrescriptionsById(this.props.Id)
    let expiration = await this.props.instance.isValid(this.props.Id)
    console.log("prescription", prescription)

    this.setState({
      name: prescription[0],
      doctorAddress: prescription[1],
      patientAddress: prescription[2],
      medication: prescription[3],
      startDate: prescription[4],
      expirationDate: prescription[5],
      isValid: expiration
    })
  }

  render(props) {
    return (
      <div>
        <li>name: {this.state.name}</li>
        <li>doctorAddress: {this.state.doctorAddress}</li>
        <li>patientAddress: {this.state.patientAddress}</li>
        <li>medication: {this.state.medication}</li>
        <li>startDate: {moment.unix(this.state.startDate).format("DD/MM/YYYY")}</li>
        <li>expirationDate: {moment.unix(this.state.expirationDate).format("DD/MM/YYYY")}</li>
        <li>isValid: {JSON.stringify(this.state.isValid)}</li>
        <br/>
      </div>
    );
  }
}
