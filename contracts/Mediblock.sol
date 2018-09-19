pragma solidity ^0.4.24;
/* import "openzeppelin-solidity/contracts/token/ERC721/ERC721Basic.sol"; */
/* contract Mediblock is ERC721Basic { */
contract Mediblock {

event NewPrescription(uint id, string name, address doctorAddress, address patientAddress, string medication, uint date, uint _expirationDate, bool isValid);
event UpdatePrescription(uint id, string name, address doctorAddress, address patientAddress, string medication, uint date, uint _expirationDate, bool isValid);



  struct Prescription {
    string name;
    address doctorAddress;
    address patientAddress;
    string medication;
    uint StartDate;
    uint expirationDate;
    bool isValid;
  }

  mapping(address => uint[]) doctorAddressToPrescriptionId;

  Prescription[] public prescriptions;

  constructor() public {}

  function createPrescription(string _name, address _doctorAddress, address _patientAddress, string _medication, uint _date, uint _expirationDate, bool _isValid) external {
    require( _doctorAddress == msg.sender);
    uint id = prescriptions.push(Prescription(_name, _doctorAddress, _patientAddress, _medication, _date, _expirationDate, _isValid )) - 1;
    doctorAddressToPrescriptionId[_doctorAddress].push(id);
    emit NewPrescription(id, _name, _doctorAddress, _patientAddress, _medication, _date, _expirationDate, _isValid);
  }

  function updatePrescription(string _name, address _doctorAddress, address _patientAddress, string _medication, uint _date, uint _expirationDate, bool _isValid) external {
    require( _doctorAddress == msg.sender);
    uint id = prescriptions.push(Prescription(_name, _doctorAddress, _patientAddress, _medication, _date, _expirationDate, _isValid )) - 1;
    doctorAddressToPrescriptionId[_doctorAddress].push(id);
    emit UpdatePrescription(id, _name, _doctorAddress, _patientAddress, _medication, _date, _expirationDate, _isValid);
  }


  function getPrescriptionsById(uint id) external view returns (string _name, address _doctorAddress, address _patientAddress, string _medication, uint _date, uint _expirationDate, bool _isValid) {
    return (prescriptions[id].name, prescriptions[id].doctorAddress, prescriptions[id].patientAddress, prescriptions[id].medication, prescriptions[id].StartDate, prescriptions[id].expirationDate, prescriptions[id].isValid);
  }

  function getPrescriptionsByAddress(address doctorAddress) external view returns(uint[] ids) {
    return doctorAddressToPrescriptionId[doctorAddress];
  }

  function isValid(uint id) external view returns (bool isValid) {
    if (prescriptions[id].expirationDate < block.timestamp
      || prescriptions[id].isValid == false) {
      return false;
    } else {
      return true;
    }
  }


  function balanceOf(address _owner) public view returns (uint256 _balance) {
    revert();
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    revert();
  }

  function exists(uint256 _tokenId) public view returns (bool _exists) {
    revert();
  }


  function approve(address _to, uint256 _tokenId) public {
    revert();
  }

  function getApproved(uint256 _tokenId)
    public view returns (address _operator) {
      revert();
    }


  function setApprovalForAll(address _operator, bool _approved) public {
    revert();
  }

  function isApprovedForAll(address _owner, address _operator)
    public view returns (bool) {
      revert();
    }


  function transferFrom(address _from, address _to, uint256 _tokenId) public {
    revert();
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId)
    public {
      revert();
    }

  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    bytes _data
  )
    public {
      revert();
    }

}
