# **Prescriptions Dapp Project Requirements**

The goal is to have a Dapp backed by an ethereum smart contract that can replace paper prescriptions.


## Stage 1: Contract


Create a ERC-721 compatible contract representing a prescription with the following attributes:

| |Prescription |
|--|--|
|  Patient Name: | String  
| Patient Address:  | Address
|  Medication: | String  
|  Date Created: | Date (Integer)
 |
At this stage, prescriptions should be made by the patient itself, and should not be able to be transferred.

Create the contract and a few test cases.

## Stage 2: DApp

Create a DApp where patients can create prescriptions and view all prescriptions they have access to.

## Stage 3: Expiration Date
Add an expiration date to the prescription.

| |Prescription |
|--|--|
|  Patient Name: | String  
| Patient Address:  | Address
|  Medication: | String  
|  Date Created: | Date (Integer)
| Expiration Date:  | Date (Integer)
 |
The contract should have a method **isValid()** that returns true if the expiration date hasn’t passed.

Update the Dapp to display the expiration date and whether the prescription is still valid.

## Stage 4: Doctors

Add a doctor to the prescription. Now doctors can create prescriptions and assign them to patients. A doctor can not assign prescriptions to themselves.

| |Prescription |
|--|--|
|  Patient Name: | String  
| Doctor Address:  | Address  
| Patient Address:  | Address
|  Medication: | String  
|  Date Created: | Date (Integer)
| Expiration Date:  | Date (Integer)
 |
Update the Dapp to allow doctors to create prescriptions.
At this stage, any user can act as a doctor.

## Stage 5: Invalidate prescription
Allow doctors to invalidate prescriptions that they have issued.

| |Prescription |
|--|--|
|  Patient Name: | String  
| Doctor Address:  | Address  
| Patient Address:  | Address
|  Medication: | String  
|  Date Created: | Date (Integer)
| Expiration Date:  | Date (Integer)
| Is Invalidated:  | Boolean
 |

Invalidated prescriptions should return false for **isValid().** Update the Dapp to display invalid prescriptions and allow doctors to revoke them.

## Future features

**Stage 6: Pharmacies and Refills**  
Add a number of refills, which is set by the doctor when creating the prescription.

| |Prescription |
|--|--|
|  Patient Name: | String  
| Doctor Address:  | Address  
| Patient Address:  | Address
|  Medication: | String  
|  Date Created: | Date (Integer)
| Expiration Date:  | Date (Integer)
| Is Invalidated:  | Boolean
| Refills:  | Integer
 |

A user can send their prescription to a “pharmacist” by calling **sendToPharmacist()**. This should emit a DispenseRequest event which contains the address of the pharmacist.

The pharmacist can then call a method **dispense()** on the contract. This will reduce the number of remaining refills, and emit a Dispense event, which the address of the pharmacist.

Once a prescription reaches 0 refills, isValid should return false. At this stage, any user can be a pharmacist.

Update the Dapp to allow users to send prescriptions to pharmacists and allow pharmacists to dispense prescriptions.

**Stage 7: Government**

The contract should store a single address representing the government, and a list of addresses corresponding to doctors and pharmacists. This government official should be able to call a functions setDoctor and setPharmacist to add or remove the address from that list.

Update isValid to return false if the doctor who assigned the prescription is no longer a valid doctor. Don’t allow pharmacists to dispense prescriptions if they’re not on the list of approved pharmacists.

Allow the government user to transfer their authority to another address.

Update the Dapp to allow the government user to add and remove doctors and pharmacists from the list.
