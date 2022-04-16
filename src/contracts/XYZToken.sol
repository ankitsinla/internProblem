// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XYZToken is ERC20, ERC20Detailed {
    constructor() public ERC20Detailed('XYZ Token','XYZ',18){
        _mint(msg.sender,100000000*10**18);

    } 
}