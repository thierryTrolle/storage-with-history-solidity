// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// @title Poc pour dev do a storage with history for fun 
// @author me
// @dev it's just a game
contract StorageWithHistory{

    // value to set
    uint private _value;

    // increment history
    uint private _historyLenght;

    /// A change entry, save msg.sender and new value.
    struct ChangeEntry {
        address addressSetter;
        uint newValue;
    }

    // Change history
    mapping(uint=>ChangeEntry) private _changeHistory;

    ///  when an address set value
    event EventSetValue(address addressSetter,uint newValue);

    /// constructor just set the value to 0
    constructor() public{
        _value=0;
        _historyLenght=0;
    }

    ///  To set value
    function setValue(uint value) public{
        _value=value;
        _changeHistory[_historyLenght]=ChangeEntry(msg.sender, value);
        _historyLenght++;
        emit EventSetValue(msg.sender, value);
    }
    
    /// Get value 
    function getValue() public view returns(uint){
        return _value;
    }

    /// Get history entries lenght
    function getHistoryLenght() public view returns(uint){
        return _historyLenght;
    }

    /// Get history entry 
    /// @param entry : entry point form 0 to  _historyLenght
    function getHistoryEntry(uint entry) public view returns(address,uint){
        require(entry>=0 && entry<_historyLenght,"History entry not exist");
        return (_changeHistory[entry].addressSetter,_changeHistory[entry].newValue);
    }
}