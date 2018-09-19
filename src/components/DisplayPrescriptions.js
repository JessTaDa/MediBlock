import React from 'react';
import moment from 'moment';
import Toggle from 'react-toggle';
import '../css/toggle.css'

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
      isValid: null,
      instance: null
    }
    this.handleValidity = this.handleValidity.bind(this);
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
      // instance: this.props.instance
    })
    console.log("componentDidMount.this.props.instance", this.props.instance)
  }

  async handleValidity(event) {
    if (this.state.isValid === true) {
      await this.setState({
        isValid: false
      })
      return
    } await this.setState({
        isValid: true
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
          <Toggle defaultChecked={this.state.isValid} onChange={this.handleValidity}/>
          {console.log("IsValidRender", this.state.isValid)}
          {console.log("this.state", this.state)}
        <br/>
        <button value="button" onClick={async (event) => {
          event.preventDefault()
          let updateMeds = await this.props.instance.updatePrescription(this.state.name, this.state.doctorAddress, this.state.doctorAddress, this.state.medication, this.state.startDate, this.state.expirationDate, this.state.isValid, {from: this.state.doctorAddress})
          console.log("updateMeds", updateMeds)
        }}>See Update Prescriptions</button>
      </div>
    );
  }
}
