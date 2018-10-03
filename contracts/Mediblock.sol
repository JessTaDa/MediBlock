pragma solidity ^0.4.24;
/* import "openzeppelin-solidity/contracts/token/ERC721/ERC721Basic.sol"; */
/* contract Mediblock is ERC721Basic { */
contract Mediblock {

event NewPrescription(uint id);

  struct Prescription {
    string name;
    address doctorAddress;
    address patientAddress;
    string medication;
    uint StartDate;
    uint expirationDate;
    bool approvedByDoctor;
  }

  mapping(address => uint[]) doctorAddressToPrescriptionId;
  mapping(address => uint[]) patientAddressToPrescriptionId;

  Prescription[] public prescriptions;

  constructor() public {}

  function createPrescription(string _name, address _doctorAddress, address _patientAddress, string _medication, uint _date, uint _expirationDate) external {
    require( _doctorAddress == msg.sender);
    uint id = prescriptions.push(Prescription(_name, _doctorAddress, _patientAddress, _medication, _date, _expirationDate, true )) - 1;
    doctorAddressToPrescriptionId[_doctorAddress].push(id);
    patientAddressToPrescriptionId[_patientAddress].push(id);
    emit NewPrescription(id);
  }

  function getPrescriptionsById(uint id) external view returns (string _name, address _doctorAddress, address _patientAddress, string _medication, uint _date, uint _expirationDate, bool approvedByDoctor) {
    return (prescriptions[id].name, prescriptions[id].doctorAddress, prescriptions[id].patientAddress, prescriptions[id].medication, prescriptions[id].StartDate, prescriptions[id].expirationDate, prescriptions[id].approvedByDoctor);
  }

  function getPrescriptionsByPatientAddress(address patientAddress) external view returns(uint[] ids) {
    return patientAddressToPrescriptionId[patientAddress];
  }

  function getPrescriptionsByDoctorAddress(address doctorAddress) external view returns(uint[] ids) {
    return doctorAddressToPrescriptionId[doctorAddress];
  }

  function isValid(uint id) external view returns (bool) {
    if (prescriptions[id].expirationDate < block.timestamp){
      return false;
    }
      return true;
  }

  function setApprovedByDoctor(uint id, bool approvedByDoctor) external {
      prescriptions[id].approvedByDoctor = approvedByDoctor;
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
