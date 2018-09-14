import React from 'react';
import moment from 'moment';

export default class DisplayPrescriptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      address: null,
      medication: "",
      startDate: null,
      expirationDate: null,
      isValid: null
    }
  }

  async componentDidMount() {
    let prescription = await this.props.instance.getPrescriptionsById(this.props.Id)
    let expiration = await this.props.instance.isValid(this.props.Id)

    this.setState({
      name: prescription[0],
      address: prescription[1],
      medication: prescription[2],
      startDate: prescription[3],
      expirationDate: prescription[4],
      isValid: expiration
    })
  }

  render(props) {
    return (
      <div>
        <li>name: {this.state.name}</li>
        <li>address: {this.state.address}</li>
        <li>medication: {this.state.medication}</li>
        <li>startDate: {moment.unix(this.state.startDate).format("DD/MM/YYYY")}</li>
        <li>expirationDate: {moment.unix(this.state.expirationDate).format("DD/MM/YYYY")}</li>
        <li>isValid: {JSON.stringify(this.state.isValid)}</li>
        <br/>
        <br/>
      </div>
    );
  }
}
