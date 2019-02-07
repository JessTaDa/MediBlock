# MediBlock
A decentralised application for the creation and management of medical prescriptions.

# Design Process
User stories were drafted to meet the user basic requirements for the task. See ```Requirements.md``` for project requirements.


# Installation and Setup

### Truffle
Install truffle on your device as per the docs here: http://truffleframework.com/docs.

### Ganache
Install and run Ganache. More information on installation found [here](npm install -g ganache-cli).
The project has been created and tested using ganache desktop app on port 8545. To change this port (i.e. if you are using ganache desktop or truffle develop) please go to ```truffle-config.js``` in the root folder and change the port number at ```port: 8545 ``` to match the port you desire. Make sure your Ganache accounts are up an running with available ETH balances.

### Metamask
Install the Metamask Google Chrome Browser extension from [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) and follow instructions to set up accounts. Ensure accounts on Metamask are linked to the accounts running on Ganache and connected on the correct network. You can see this by checking if the addresses and balances in your ganache-cli instance and Metamask match.

### Launch Dapp!
You're ready to run the project! Ensure Google Chrome is open and that your are signed into Metamask, with your accounts matching your ganache accounts.

1. Make a new directory and clone the project by running ```$ git clone https://github.com/JessTaDa/mediblockReact.git```

2. In your terminal window, navigate to project root folder and run ```truffle compile```.

3.  Once compilation is successful, run ```truffle migrate --reset```.

4. Still in the project root folder, run ```npm install```. Then ```npm run start```. A new tab in google chrome should open and you should see the following page running on ```localhost:3000```:

![screen shot 2019-02-07 at 2 54 54 pm](https://user-images.githubusercontent.com/17763644/52389618-69f5b380-2ae8-11e9-9384-825d700dd47a.png)

*NOTE: Your current address will always be the address displayed at the top of the page. When switching between accounts on Metamask, it is important to ensure the address is the correct one for you.*

Currently the app requires you to refresh the page each time you are switching between accounts in Metamask. Future versions of this app will not require this.


# Interacting with the Dapp
### Creating a new prescription
Simply fill out the 'Create New Prescription' form with the
- Patient Full Name: *Name of the Patient*
- Patient Address: *Public ETH address of the patient*
- Medication: *Name of the medication to be precscribed*
- Expiration Date: *Select when this prescription will expire and no longer be valid*

When you are happy with the inputs for your new prescription, click on the 'Create Prescription' button.

A Metamask modal will pop up displaying the transaction details. Check this is correct, then proceed with the transaction. Once the transaction has successfully gone through and your prescription has been created, you can view it (along with all your other created prescriptions) by clicking on the 'My Created Prescriptions' button.

![screen shot 2019-02-07 at 2 41 48 pm](https://user-images.githubusercontent.com/17763644/52389749-2780a680-2ae9-11e9-893d-bf9b585e2150.png)

### Reviewing Prescription validity
If the browser session is your address, you are able to view your created prescriptions. You are able to change the validity of your created prescriptions using the toggle. Once you have updated the toggle, click on the 'Update Prescription' button to send this update to the blockchain.

![screen shot 2019-02-07 at 2 43 18 pm](https://user-images.githubusercontent.com/17763644/52390011-5e0af100-2aea-11e9-885f-440816b32c99.png)


Clicking this will trigger another Metamask modal, asking to confirm the transaction. Once the transaction succeeds, the validity of the prescription will be updated. Future versions of this app will make this feature easier to see, as currently it is not displayed very clearly.


# Future features
### Automatic app refresh
Currently users of the Dapp are required to manually refresh the page in the browser when changing between accounts in Metamask. A future feature would be to make this refresh automatic when a change in accounts has been detected.
