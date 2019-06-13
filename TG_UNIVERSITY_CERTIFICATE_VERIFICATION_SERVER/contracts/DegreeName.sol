pragma solidity >=0.4.21 <0.6.0;

contract DegreeNameStorage {

    // event setDegreeNameEvent(uint256 degreeKindId, uint256 _degreeNameId, string degreeName);

    uint256 index;

    struct DegreeName {
        string userAddressKind;
        address userAddressName;
        string degreeName;
    }

    mapping (address => DegreeName) DegreeNameMapping;

     //DegreeName degreeNames;

    function setDegreeName(string memory _userAddressKind, address _userAddressName, string memory _degreeName) public {
        DegreeNameMapping[_userAddressName].userAddressKind = _userAddressKind;
        DegreeNameMapping[_userAddressName].userAddressName = _userAddressName;
        DegreeNameMapping[_userAddressName].degreeName = _degreeName;

        // DegreeNameMapping[_degreeNameId] = degreeNames;
        index++;
        // emit setDegreeNameEvent(_degreeKindId, _degreeNameId, _degreeName);

        // return true;
    }

    function getDegreeName(address _userAddressName) public view returns(string memory userAddressKind, address userAddressName,
    string memory degreeName) {
        // DegreeName memory tmpData = DegreeNameMapping[_degreeNameId];
        return (DegreeNameMapping[_userAddressName].userAddressKind,
        DegreeNameMapping[_userAddressName].userAddressName,
        DegreeNameMapping[_userAddressName].degreeName);
    }

    function getDegreeNameIndex() public view returns(uint256) {
        return index;
    }
}