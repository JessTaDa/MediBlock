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
      myPrescriptionIds: []
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
    let rawPrescriptionIds = await this.state.instance.getPrescriptionsByAddress(this.state.account, {from: this.state.account})
    let myPrescriptionIds = await rawPrescriptionIds.map(bignum => bignum.toNumber())
    this.setState({myPrescriptionIds: myPrescriptionIds})
  }

  render() {
     return (
       <div>
         <CreatePrescription
         id={this.state.id}
         instance={this.state.instance}
         account={this.state.account}
         />
         {this.state.myPrescriptionIds.map((prescriptionId, index) =>
           <DisplayPrescriptions Id={prescriptionId} instance={this.state.instance}/>
         )}
        <button value="button" onClick={this.handleClick}>See Prescriptions</button>
       </div>
    )
  }
}


export default App
