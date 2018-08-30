pragma solidity ^0.4.24;
/* import "openzeppelin-solidity/contracts/token/ERC721/ERC721Basic.sol"; */

/* contract Mediblock is ERC721Basic { */
contract Mediblock {

event NewPrescription(uint id, string name, address patientAddress, string medication, uint date, uint _expirationDate);

  struct Prescription {
    string name;
    address patientAddress;
    string medication;
    uint date;
    uint expirationDate;
  }

  /* mapping (uint => address) prescriptionToOwner;
  mapping (address => uint) ownerPrescriptionCount; */
  mapping(address => uint[]) patientAddressToPrescriptionId;

  Prescription[] public prescriptions;

  constructor() public {}

  function createPrescription(string _name, address _patientAddress, string _medication, uint _date, uint _expirationDate) external {
    require( _patientAddress == msg.sender);
    uint id = prescriptions.push(Prescription(_name, _patientAddress, _medication, _date, _expirationDate )) - 1;
    /* prescriptionToOwner[id] = msg.sender;
    ownerPrescriptionCount[msg.sender]++; */

    patientAddressToPrescriptionId[_patientAddress].push(id);

    emit NewPrescription(id, _name, _patientAddress, _medication, _date, _expirationDate);
  }

  function getPrescriptionsById(uint id) external view returns (address patientAddress, string medication) {
    return (prescriptions[id].patientAddress, prescriptions[id].medication);
  }

  function getPrescriptionsByAddress(address patientAddress) external view returns(uint[] ids) {
    return patientAddressToPrescriptionId[_patientAddress];
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
