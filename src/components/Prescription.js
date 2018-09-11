import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//
// import './css/oswald.css';
// import './css/open-sans.css';
// import './css/pure-min.css';
// import './App.css';

export default class Prescription extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(props) {
    return (
      <div>
        <p>Create new prescription below:</p>
        <form onSubmit={this.props.handleSubmit}>
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
            <input type="text" value={this.props.startDate} onChange={(event) => this.setState({startDate: event.target.value})} />
          </label>
          <br/>
          <label>
            expiration date:
            <DatePicker selected={this.props.expirationDate} onChange={(event) => this.props.handleChange(event)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <p>See patient address below:</p>
              <p>The patient id is: {this.state.id}</p>
              <p>The patient name is: {this.state.name}</p>
              <p>The patient medication is: {this.state.medication}</p>
              <p>The patient startDate is: {this.props.startDate.toString()}</p>
              <p>The patient expirationDate is: {this.props.expirationDate.toString()}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
