pragma solidity >=0.4.21 <0.6.0;

contract DegreeKindStorage {
    struct DegreeKind {
        string degreeKindName;
        uint256 index;
    }

    mapping (address => DegreeKind) DegreeKindMapping;
    address[] degreeKindIndex;

    event LeaderUpdatedEvent(
        address _degreeKindId,
        string _degreeKindName
    );

    event CountryDeleteEvent(
        address _degreeKindId
    );

    event SetDegreeKindEvent(
        address _degreeKindId,
        string _degreeKindName,
        uint256 _index
    );

    event SetDeleteDegreeKind(
        address _degreeKindId,
        uint256 index
    );

    function isUser(address _degreeKindId) public view returns(bool isIndeed) {
      if(degreeKindIndex.length == 0) return false;
      return (degreeKindIndex[DegreeKindMapping[_degreeKindId].index] == _degreeKindId);
   }

    function InsertDegreeKind(
        address _degreeKindId,
        string memory _degreeKindName
    ) public returns(uint256 index) {
        DegreeKindMapping[_degreeKindId].degreeKindName = _degreeKindName;
        DegreeKindMapping[_degreeKindId].index = degreeKindIndex.push(_degreeKindId)-1;
        emit SetDegreeKindEvent(
            _degreeKindId,
            _degreeKindName,
            DegreeKindMapping[_degreeKindId].index);
        return degreeKindIndex.length-1;
    }

    function deleteDegreeKind(address _degreeKindId) public returns(uint256 index){
        uint256 rowToDelete = DegreeKindMapping[_degreeKindId].index;
        address keyToMove = degreeKindIndex[degreeKindIndex.length-1];
        degreeKindIndex[rowToDelete] = keyToMove;
        DegreeKindMapping[keyToMove].index = rowToDelete;

        degreeKindIndex.length--;
        emit SetDeleteDegreeKind(
            _degreeKindId,
            rowToDelete);
        emit SetDegreeKindEvent(
            keyToMove,
            DegreeKindMapping[keyToMove].degreeKindName,
            rowToDelete);
        return rowToDelete;
    }

    function getDegreeKind(
        address _degreeKindId
    ) public view returns(
        address degreeKindId,
        string memory degreeKindName
    ) {
        return (
            _degreeKindId,
            DegreeKindMapping[_degreeKindId].degreeKindName
        );
    }

    function updateDegreeKindName(
        address _degreeKindId,
        string  memory  _degreeKindName
    ) public returns(bool success) {
        DegreeKindMapping[_degreeKindId].degreeKindName = _degreeKindName;
        return true;
    }

    function getDegreeKindCount() public view returns(uint256 count){
        return degreeKindIndex.length;
      }

    function getDegreeKindAtIndex(uint256 _index) public view returns(address userAddress) {
        return degreeKindIndex[_index];
    }

}