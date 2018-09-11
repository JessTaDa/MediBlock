import React, { Component } from 'react';
import Mediblock from '../build/contracts/Mediblock.json';
import getWeb3 from './utils/getWeb3';
// import DatePicker from 'react-datepicker';
import moment from 'moment';

import Prescription from './components/Prescription';

import 'react-datepicker/dist/react-datepicker.css';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       id: 0,
//       name: "",
//       medication: "",
//       startDate: moment(),
//       web3: null,
//       instance: null,
//       account: null,
//       prescriptionArray: [],
//       expirationDate: moment(),
//       isValid: true
//     }
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
//
//   componentWillMount() {
//     getWeb3
//     .then(results => {
//       this.setState({
//         web3: results.web3
//       })
//       this.instantiateContract()
//     })
//     .catch((e) => {
//       console.log('Error finding web3.', e)
//     })
//   }
//
//   instantiateContract() {
//     const contract = require('truffle-contract')
//     const mediblock = contract(Mediblock)
//     mediblock.setProvider(this.state.web3.currentProvider)
//     var initialMediblockInstance
//     this.state.web3.eth.getAccounts(async (error, accounts) => {
//       initialMediblockInstance = await mediblock.deployed();
//       this.setState({instance:initialMediblockInstance, account: accounts[0]})
//     })
//   }
//
//   async handleSubmit(event) {
//     event.preventDefault();
//       const result = await this.state.instance.createPrescription(this.state.name, this.state.account, this.state.medication, this.state.startDate.unix(), this.state.expirationDate.unix(), {from: this.state.account})
//       console.log("result", result)
//   }
//
//   async handleClick(event) {
//     event.preventDefault();
//       const myPrescriptionIds = await this.state.instance.getPrescriptionsByAddress(this.state.account, {from: this.state.account})
//       var prescriptionArray = this.state.prescriptionArray
//       myPrescriptionIds.forEach(async(prescription, index) => {
//         const myMedications = await this.state.instance.getPrescriptionsById(index, {from: this.state.account})
//         console.log("myMedications", myMedications)
//         prescriptionArray.push(myMedications[1])
//         this.setState({prescriptionArray: prescriptionArray})
//         const expiration = await this.state.instance.isValid(index)
//         console.log("expiration", expiration)
//       })
//     }
//
//     handleChange(date) {
//       this.setState({
//         expirationDate: moment(date)
//       });
//     }
//
//     isValid(expirationDate) {
//       if (moment().isAfter(expirationDate)){
//         this.setState({
//           isValid: false
//         })
//
//       }
//     }
//
//   render() {
//     return (
//       <div>
//         <p>Create new prescription below:</p>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             name:
//             <input type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
//           </label>
//           <br/>
//           <label>
//             medication:
//             <input type="text" value={this.state.medication} onChange={event => this.setState({medication: event.target.value})} />
//           </label>
//           <br/>
//           <label>
//             date:
//             <input type="text" value={this.state.startDate} onChange={event => this.setState({startDate: event.target.value})} />
//           </label>
//           <br/>
//           <label>
//             expiration date:
//             <DatePicker selected={this.state.expirationDate} onChange={this.handleChange}/>
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//         <main className="container">
//           <div className="pure-g">
//             <div className="pure-u-1-1">
//                 <button value="button" onClick={this.handleClick}></button>
//               <p>See patient address below:</p>
//               <p>The patient id is: {this.state.id}</p>
//               <p>The patient name is: {this.state.name}</p>
//               <p>The patient medication is: {this.state.medication}</p>
//               <p>The patient startDate is: {this.state.startDate.toString()}</p>
//               <p>The patient prescriptionArray is: {this.state.prescriptionArray}</p>
//               <p>The patient expirationDate is: {this.state.expirationDate.toString()}</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
// }
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
    // this.handleChange = this.handleChange.bind(this);
  }

  onChangeExpirationDate(Exp) {
    this.setState({
      expirationDate: Exp
    })
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
        name={this.state.name}
        medication={this.state.medication}
        startDate={this.state.startDate}
        expirationDate={this.state.expirationDate}
        OnChangeExpirationDate={this.onChangeExpirationDate.bind()}
        handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}


export default App
