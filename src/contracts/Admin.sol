// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./XYZToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Admin {
    XYZToken public token;
    uint public createdAt;
    uint public remTime;
    uint public lastDispersal ;
    uint public tokensPerMin;

    constructor() public{
        token = new XYZToken();
        createdAt = now;
        remTime = now + 365 days;
        token.transfer(address(this),100000000000000000000000000);
        tokensPerMin = token.balanceOf(address(this))/365/24/60;
    }

    address[] public dispersalAddress;
    uint public addressCount = 0;

    event addressAdded(address newAddress);

    function addAddress(address _newAddress) external {
        require(addressCount < 10 , "Max dispersal addresses reached.");
        dispersalAddress.push(_newAddress);
        addressCount++;
        dispersal();
        emit addressAdded(_newAddress);
    }

    function dispersal() public {
        require(addressCount > 0,"No address added");
        uint mins = 0;
        if(lastDispersal == 0){
            mins = (now - createdAt)/60;
        }else{
            mins = (now - lastDispersal)/60;
        }

        uint tokensPerAddress = (tokensPerMin / addressCount)*mins;
        for(uint add = 0 ; add < addressCount ; add++){
            token.transfer(dispersalAddress[add],tokensPerAddress);
        }
    }

    function addressBalance(address add) view internal returns(uint) {
        return token.balanceOf(add);
    }

    function getAllAddress() external view returns(address[] memory){
        address[] memory addressList = new address[](addressCount);
        for(uint i = 0 ;i<addressCount ; i++){
            addressList[i] = dispersalAddress[i];
        }
        return addressList;
    }

    function getAllAddressBalances() external view returns(uint[] memory){
        uint[] memory balanceList = new uint[](addressCount);
        for(uint i = 0 ;i<addressCount ; i++){
            balanceList[i] = addressBalance(dispersalAddress[i]);
        }
        return balanceList;
    }
}