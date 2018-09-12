import React from 'react';

export default class DisplayPrescription extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render(props) {
    return (
      <div>
        <p>ALL MY PRESCRIPTIONS:</p>
          <p>The patient id is: {this.state.id}</p>
          <p>The patient name is: {this.props.name}</p>
          <p>The patient medication is: {this.props.medication}</p>
          <p>The patient startDate is: {this.props.startDate.toString()}</p>
          <p>The patient expirationDate is: {this.props.expirationDate.toString()}</p>
          <p>The patient prescriptionArray is: {this.props.prescriptionArray}</p>
      </div>
    );
  }
}
