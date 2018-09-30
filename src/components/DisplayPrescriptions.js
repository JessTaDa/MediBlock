import React from 'react';
import moment from 'moment';
import Toggle from 'react-toggle';
import {Button, CardPanel, Collection, CollectionItem} from 'react-materialize';

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
      approvedByDoctor: true,
      instance: null
    }
    this.handleDoctorApproval = this.handleDoctorApproval.bind(this);
  }

  async componentDidMount() {
    let prescription = await this.props.instance.getPrescriptionsById(this.props.id)
    let expiration = await this.props.instance.isValid(this.props.id)
    console.log("prescription", prescription)

    this.setState({
      name: prescription[0],
      doctorAddress: prescription[1],
      patientAddress: prescription[2],
      medication: prescription[3],
      startDate: prescription[4],
      expirationDate: prescription[5],
      approvedByDoctor: prescription[6],
      isValid: expiration
    })
    console.log("componentDidMount.this.props.instance", this.props.instance)
    console.log("componentDidMount.this.state", this.state)

  }

  async handleDoctorApproval(event) {
    if (this.state.approvedByDoctor === true) {
      await this.setState({
        approvedByDoctor: false
      })
      return
    } else if (this.state.approvedByDoctor === false) {
      await this.setState({
        approvedByDoctor: true
      })
      return
    }
  }

  render(props) {
    return (
      <div>
<CardPanel className="teal lighten-4 black-text">
<Collection header='Prescription'>
        <CollectionItem>name: {this.state.name}</CollectionItem>
        <CollectionItem>doctorAddress: {this.state.doctorAddress}</CollectionItem>
        <CollectionItem>patientAddress: {this.state.patientAddress}</CollectionItem>
        <CollectionItem>medication: {this.state.medication}</CollectionItem>
        <CollectionItem>startDate: {moment.unix(this.state.startDate).format("DD/MM/YYYY")}</CollectionItem>
        <CollectionItem>expirationDate: {moment.unix(this.state.expirationDate).format("DD/MM/YYYY")}</CollectionItem>
        <CollectionItem>isValid: {JSON.stringify(this.state.isValid)}</CollectionItem>
        <CollectionItem>approvedByDoctor: {JSON.stringify(this.state.approvedByDoctor)}</CollectionItem>
</Collection>
        <br/>
        <Toggle defaultChecked={this.state.approvedByDoctor} onChange={this.handleDoctorApproval}/>
        {console.log("approvedByDoctorRender.this.state", this.state)}
        <br/>
        <Button class="btn waves-effect waves-light" type="submit" name="action" value="button" onClick={async (event) => {
          event.preventDefault()
          console.log("this.state.doctorAddress", this.state.doctorAddress)
          console.log("this.props.id", this.props.id)
          let updateMeds = await this.props.instance.setApprovedByDoctor(this.props.id, this.state.approvedByDoctor, {from: this.state.doctorAddress})
          console.log("updateMeds", updateMeds)
        }}>Update approvedByDoctor for Prescription</Button>
        </CardPanel>
        <br/>
      </div>
    );
  }
}
