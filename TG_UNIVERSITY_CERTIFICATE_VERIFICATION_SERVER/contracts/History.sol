pragma solidity >=0.4.21 <0.6.0;

contract DegreeHistory {
    struct History {
        address taiKhoan;
        string thaoTac;
        string ngay;
        uint256 index;
    }

    mapping(address => History) HistoryMapping;
    address[] historyIndex;

    event SetHistoryEvent(
        address _idHistory,
        address _taiKhoan,
        string _thaoTac,
        string _ngay,
        uint256 index
    );

    function InsertHistory(
        address _idHistory,
        address _taiKhoan,
        string memory _thaoTac,
        string memory _ngay
    ) public returns(uint256 index){
        HistoryMapping[_idHistory].taiKhoan = _taiKhoan;
        HistoryMapping[_idHistory].thaoTac = _thaoTac;
        HistoryMapping[_idHistory].ngay = _ngay;
        HistoryMapping[_idHistory].index = historyIndex.push(_idHistory)-1;
        emit SetHistoryEvent(
            _idHistory,
            _taiKhoan,
            _thaoTac,
            _ngay,
            HistoryMapping[_idHistory].index);
        return historyIndex.length-1;
    }

    function getHistory(
        address _idHistory
    ) public view returns(
        address taiKhoan,
        string memory thaoTac,
        string memory ngay
    ) { return (
        HistoryMapping[_idHistory].taiKhoan,
        HistoryMapping[_idHistory].thaoTac,
        HistoryMapping[_idHistory].ngay);
    }

    function getHistoryCount() public view returns(uint256 count){
        return historyIndex.length;
      }

    function getHistoryAtIndex(uint256 _index) public view returns(address idHistory) {
        return historyIndex[_index];
    }
}