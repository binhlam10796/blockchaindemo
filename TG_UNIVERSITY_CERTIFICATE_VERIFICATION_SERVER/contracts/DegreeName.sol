pragma solidity >=0.4.21 <0.6.0;

contract DegreeNameStorage {
    struct DegreeName {
        address degreeKindId;
        string degreeName;
        uint256 index;
    }

    mapping (address => DegreeName) DegreeNameMapping;
    address[] degreeNameIndex;

    // Update degreeName
    event SetDegreeNameEvent(
        address _degreeNameId,
        address _degreeKindId,
        string _degreeName,
        uint256 index
    );

    // Delete degreeName
    event SetDeleteDegreeName(
        address _degreeNameId,
        uint256 index
    );

    function isUser(address _degreeKindId) public view returns(bool isIndeed) {
      if(degreeNameIndex.length == 0) return false;
      return (degreeNameIndex[DegreeNameMapping[_degreeKindId].index] == _degreeKindId);
   }

    function InsertDegreeName(
        address _degreeNameId,
        address _degreeKindId,
        string memory _degreeName
    ) public returns(uint256 index){
        DegreeNameMapping[_degreeNameId].degreeKindId = _degreeKindId;
        DegreeNameMapping[_degreeNameId].degreeName = _degreeName;
        DegreeNameMapping[_degreeNameId].index = degreeNameIndex.push(_degreeNameId)-1;
        emit SetDegreeNameEvent(
            _degreeNameId,
            _degreeKindId,
            _degreeName,
            DegreeNameMapping[_degreeNameId].index);
        return degreeNameIndex.length-1;
    }

    function deleteDegreeName(address _degreeNameId) public returns(uint256 index){
        uint256 rowToDelete = DegreeNameMapping[_degreeNameId].index;
        address keyToMove = degreeNameIndex[degreeNameIndex.length-1];
        degreeNameIndex[rowToDelete] = keyToMove;
        DegreeNameMapping[keyToMove].index = rowToDelete;

        degreeNameIndex.length--;
        emit SetDeleteDegreeName(
            _degreeNameId,
            rowToDelete);
        emit SetDegreeNameEvent(
            keyToMove,
            DegreeNameMapping[keyToMove].degreeKindId,
            DegreeNameMapping[keyToMove].degreeName,
            rowToDelete);
        return rowToDelete;
    }

    function getDegreeName(
        address _degreeNameId
    ) public view returns(
        address degreeNameId,
        address degreeKindId,
        string memory degreeName
    ) { return (
        _degreeNameId,
        DegreeNameMapping[_degreeNameId].degreeKindId,
        DegreeNameMapping[_degreeNameId].degreeName);
    }

    function updateDegreeKindName(
        address _degreeNameId,
        address _degreeKindId
    ) public returns(bool success) {
        DegreeNameMapping[_degreeNameId].degreeKindId = _degreeKindId;
        return true;
    }

    function updateDegreeName(
        address _degreeNameId,
        string  memory  _degreeName
    ) public returns(bool success) {
        DegreeNameMapping[_degreeNameId].degreeName = _degreeName;
        return true;
    }

    function getDegreeNameCount() public view returns(uint256 count){
        return degreeNameIndex.length;
      }

    function getDegreeNameAtIndex(uint256 _index) public view returns(address _degreeNameId) {
        return degreeNameIndex[_index];
    }
}