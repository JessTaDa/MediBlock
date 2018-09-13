import React from 'react';

export default class DisplayPrescriptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      address: null,
      medication: "",
      startDate: null,
      expirationDate: null
    }
  }

  async componentDidMount() {
    let prescription = await this.props.instance.getPrescriptionsById(this.props.Id)
    this.setState({
      name: prescription[0],
      address: prescription[1],
      medication: prescription[2],
      startDate: prescription[3],
      expirationDate: prescription[4]
    })
  }

  render(props) {
    return (
      <div>
        <li>name: {this.state.name}</li>
        <li>address: {this.state.address}</li>
        <li>medication: {this.state.medication}</li>
        <li>startDate: {JSON.stringify(this.state.startDate)}</li>
        <li>expirationDate: {JSON.stringify(this.state.expirationDate)}</li>
        <br/>
        <br/>
      </div>
    );
  }
}
