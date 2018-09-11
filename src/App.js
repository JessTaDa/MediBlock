import React, { Component } from 'react';
import Mediblock from '../build/contracts/Mediblock.json';
import getWeb3 from './utils/getWeb3';
import moment from 'moment';
import Prescription from './components/Prescription';

import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      name: "",
      medication: "",
      startDate: moment(),
      web3: null,
      instance: null,
      account: null,
      prescriptionArray: [],
      expirationDate: moment(),
      isValid: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      initialMediblockInstance = await mediblock.deployed();
      this.setState({instance:initialMediblockInstance, account: accounts[0]})
    })
  }

  handleChange(date) {
    console.log("date", date)
        this.setState({
          expirationDate: moment(date)
        });
      }

  async handleSubmit(event) {
    event.preventDefault();
      const result = await this.state.instance.createPrescription(this.state.name, this.state.account, this.state.medication, this.state.startDate.unix(), this.state.expirationDate.unix(), {from: this.state.account})
      console.log("result", result)
  }

  async handleClick(event) {
    event.preventDefault();
      const myPrescriptionIds = await this.state.instance.getPrescriptionsByAddress(this.state.account, {from: this.state.account})
      var prescriptionArray = this.state.prescriptionArray
      myPrescriptionIds.forEach(async(prescription, index) => {
        const myMedications = await this.state.instance.getPrescriptionsById(index, {from: this.state.account})
        console.log("myMedications", myMedications)
        prescriptionArray.push(myMedications[1])
        this.setState({prescriptionArray: prescriptionArray})
        const expiration = await this.state.instance.isValid(index)
        console.log("expiration", expiration)
      })
    }

  render() {
     return (
      <div>
      <button value="button" onClick={this.handleClick}></button>
        <Prescription
        id={this.state.id}
        name={this.state.name}
        medication={this.state.medication}
        startDate={this.state.startDate}
        expirationDate={this.state.expirationDate}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}


export default App
