// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

//0xdfFcf16b20ccb4B81EfDEdaf7a72bE6B16a35041 SEPOLIA KAKAROT

contract MyToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("pToken2", "PTK2")
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public  {
        _mint(to, amount);
    }
}
