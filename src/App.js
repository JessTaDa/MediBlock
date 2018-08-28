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
      patientAddress: null,
      web3: null
    }
  }

  componentWillMount() {

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {

    const contract = require('truffle-contract')
    const mediblock = contract(Mediblock)
    mediblock.setProvider(this.state.web3.currentProvider)

    var mediblockInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      mediblock.deployed().then((instance) => {
        mediblockInstance = instance
        console.log(mediblockInstance);
        return mediblockInstance.createPrescription("Karen", accounts[3], "cucumbers", 121212, 111111, {from: accounts[0]})
      }).then((result) => {
        console.log(result);
        return mediblockInstance.getPrescriptionsById(0)
      }).then((result) => {
        return this.setState({ patientAddress: result[0] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Mediblock</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>See patient address below:</p>
              <p>The patient address is: {this.state.patientAddress}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
