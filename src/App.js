import React, { Component } from 'react';
import Mediblock from '../build/contracts/Mediblock.json';
import getWeb3 from './utils/getWeb3';
import moment from 'moment';
import CreatePrescription from './components/CreatePrescription';
import DisplayPrescriptions from './components/DisplayPrescriptions';

import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      name: "la",
      medication: "",
      startDate: moment(),
      web3: null,
      instance: null,
      account: null,
      prescriptionArray: [],
      expirationDate: moment(),
      isValid: true
    }
    this.handleClick = this.handleClick.bind(this);
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


  async handleClick(event) {
    event.preventDefault();
      const myPrescriptionIds = await this.state.instance.getPrescriptionsByAddress(this.state.account, {from: this.state.account})
      console.log("myPrescriptionIds", myPrescriptionIds)
      // var prescriptionArray = this.state.prescriptionArray
      // myPrescriptionIds.forEach(async(prescription, index) => {
      //   const myMedications = await this.state.instance.getPrescriptionsById(index, {from: this.state.account})
      //   console.log("myMedications", myMedications)
      //   // prescriptionArray.push(myMedications[1])
      //   // prescriptionArray.push(myMedications)
      //   // console.log("prescriptionArray", prescriptionArray)
      //
      //   this.setState({prescriptionArray: prescriptionArray})
      //   const expiration = await this.state.instance.isValid(index)
      //   console.log("expiration", expiration)
      // })

      myPrescriptionIds.map( async (prescriptionId) =>
        console.log("this.state", this.state)
        // console.log(await this.state.instance.getPrescriptionsById(prescriptionId, {from: this.state.account})
        )
    }

  render() {
     return (
      <div>
      <button value="button" onClick={this.handleClick}></button>
        <CreatePrescription
        instance={this.state.instance}
        account={this.state.account}
        />

        <DisplayPrescriptions
        id={this.state.id}
        name={this.state.name}
        medication={this.state.medication}
        startDate={this.state.startDate}
        expirationDate={this.state.expirationDate}
        handleChange={this.handleChange}
        instance={this.state.instance}
        prescriptionArray={this.state.prescriptionArray}
        />
      </div>
    );
  }
}


export default App
