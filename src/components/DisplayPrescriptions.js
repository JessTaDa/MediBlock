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
          <Collection header={this.state.medication}>
            <CollectionItem><strong>Patient Name:</strong> {this.state.name}</CollectionItem>
            <CollectionItem><strong>Prescribed by:</strong> {this.state.doctorAddress}</CollectionItem>
            <CollectionItem><strong>Prescription Owner:</strong> {this.state.patientAddress}</CollectionItem>
            <CollectionItem><strong>Medication:</strong> {this.state.medication}</CollectionItem>
            <CollectionItem><strong>Date Created:</strong> {moment.unix(this.state.startDate).format("DD/MM/YYYY")}</CollectionItem>
            <CollectionItem><strong>Expiration Date:</strong> {moment.unix(this.state.expirationDate).format("DD/MM/YYYY")}</CollectionItem>
            <CollectionItem><strong>Prescription still valid?:</strong> {JSON.stringify(this.state.isValid)}</CollectionItem>
            <CollectionItem><strong>Approved by Doctor?:</strong> {JSON.stringify(this.state.approvedByDoctor)} <Toggle defaultChecked={this.state.approvedByDoctor} onChange={this.handleDoctorApproval}/></CollectionItem>
          </Collection>
        <Button class="btn waves-effect waves-light" type="submit" name="action" value="button" onClick={async (event) => {
          event.preventDefault()
          let updateMeds = await this.props.instance.setApprovedByDoctor(this.props.id, this.state.approvedByDoctor, {from: this.state.doctorAddress})
          console.log("updateMeds", updateMeds)
        }}>Update prescription</Button>
        </CardPanel>
        <br/>
      </div>
    );
  }
}
