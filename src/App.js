import React, { Component } from 'react';
import Mediblock from '../build/contracts/Mediblock.json';
import getWeb3 from './utils/getWeb3';
import moment from 'moment';
import CreatePrescription from './components/CreatePrescription';
import DisplayPrescriptions from './components/DisplayPrescriptions';
import {Button} from 'react-materialize';
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
      doctorAddress: null,
      prescriptionArray: [],
      expirationDate: moment(),
      myPrescriptionIds: [],
      validity: true
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDocClick = this.handleDocClick.bind(this);

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
      this.setState({instance:initialMediblockInstance, doctorAddress: accounts[0]})
    })
  }

  async handleClick(event) {
    event.preventDefault();
    let rawPrescriptionIds = await this.state.instance.getPrescriptionsByPatientAddress(this.state.doctorAddress, {from: this.state.doctorAddress})
    let myPrescriptionIds = await rawPrescriptionIds.map(bignum => bignum.toNumber())
    this.setState({myPrescriptionIds: myPrescriptionIds})
  }

  async handleDocClick(event) {
    event.preventDefault();
    let rawPrescriptionIds = await this.state.instance.getPrescriptionsByDoctorAddress(this.state.doctorAddress, {from: this.state.doctorAddress})
    let myPrescriptionIds = await rawPrescriptionIds.map(bignum => bignum.toNumber())
    this.setState({myPrescriptionIds: myPrescriptionIds})
  }

  render() {
     return (
       <div>
         <CreatePrescription id={this.state.id} instance={this.state.instance} doctorAddress={this.state.doctorAddress}/>
         <br/>
         {this.state.myPrescriptionIds.map((prescriptionId, index) =>
           <DisplayPrescriptions id={prescriptionId} instance={this.state.instance}/>
         )}
         <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.handleClick}>See My Prescriptions</Button>
         <br/>
         <br/>
         <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.handleDocClick}>My created Prescriptions</Button>
       </div>
     )
  }
}


export default App
