// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenExchange {
    uint256 public tokenPrice;
    uint256 public lockPeriod;
    uint256 public fee;
    
    mapping(address => uint256) public balances;
    mapping(address => uint256) public lockTimes;

    event TokensPurchased(address indexed buyer, uint256 amount);
    event TokensWithdrawn(address indexed user, uint256 amount);

    constructor(uint256 _tokenPrice, uint256 _lockPeriod) {
        tokenPrice = _tokenPrice;
        lockPeriod = _lockPeriod;
    }

    function buyTokens() external payable {
        require(msg.value > 0, "Send Ether to buy tokens");
        uint256 amount = msg.value / tokenPrice;
        balances[msg.sender] += amount;
        lockTimes[msg.sender] = block.timestamp + lockPeriod;

        emit TokensPurchased(msg.sender, amount);
    }

    function withdrawTokens() external {
        require(block.timestamp >= lockTimes[msg.sender], "Tokens are locked");
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No tokens to withdraw");

        balances[msg.sender] = 0;
        lockTimes[msg.sender] = 0;

        // Transfer tokens to the user (assuming the contract holds the tokens)
        // For simplicity, we assume the contract itself is the token holder
        // In a real scenario, you would interact with an ERC20 token contract
        payable(msg.sender).transfer(amount * tokenPrice);

        emit TokensWithdrawn(msg.sender, amount);
    }
}