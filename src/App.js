import React, { Component } from 'react'
import Mediblock from '../build/contracts/Mediblock.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      name: "",
      patientAddress: "",
      medication: "",
      date: "",
      expirationDate: "",
      web3: null,
      instance: null,
      account: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
    })
    .catch((e) => {
      console.log('Error finding web3.', e)
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const mediblock = contract(Mediblock)
    mediblock.setProvider(this.state.web3.currentProvider)
    var initialMediblockInstance
    this.state.web3.eth.getAccounts(async (error, accounts) => {
      console.log("patientAddress", accounts[0])
      initialMediblockInstance = await mediblock.deployed();
      this.setState({instance:initialMediblockInstance, account: accounts[0]})
      console.log("initialMediblockInstance", initialMediblockInstance);
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
      const result = await this.state.instance.createPrescription(this.state.name, this.state.patientAddress, this.state.medication, this.state.date, this.state.expirationDate, {from: this.state.account})
      console.log("result", result)
  }


  render() {
    return (
      <div>
        <p>Create new prescription below:</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            name:
            <input type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
          </label>
          <br/>
          <label>
            patient address:
            <input type="text" value={this.state.patientAddress} onChange={event => this.setState({patientAddress: event.target.value})} />
          </label>
          <br/>
          <label>
            medication:
            <input type="text" value={this.state.medication} onChange={event => this.setState({medication: event.target.value})} />
          </label>
          <br/>
          <label>
            date:
            <input type="text" value={this.state.date} onChange={event => this.setState({date: event.target.value})} />
          </label>
          <br/>
          <label>
            expiration date:
            <input type="text" value={this.state.expirationDate} onChange={event => this.setState({expirationDate: event.target.value})} />
          </label>
          <input type="submit" value="Submit" />
        </form>


        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>See patient address below:</p>
              <p>The patient id is: {this.state.id}</p>
              <p>The patient name is: {this.state.name}</p>
              <p>The patient address is: {this.state.patientAddress}</p>
              <p>The patient medication is: {this.state.medication}</p>
              <p>The patient date is: {this.state.date}</p>
              <p>The patient expirationDate is: {this.state.expirationDate}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
