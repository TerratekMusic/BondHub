// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenExchange {
    uint256 public lockPeriod;
    mapping(address => uint256) public tokenPrices;
    mapping(address => mapping(address => uint256)) public balances;
    mapping(address => mapping(address => uint256)) public lockTimes;

    event TokensPurchased(address indexed buyer, address indexed token, uint256 amount);
    event TokensWithdrawn(address indexed user, address indexed token, uint256 amount);

    constructor(uint256 _lockPeriod) {
        lockPeriod = _lockPeriod;
    }

    function setTokenPrice(address token, uint256 price) external {
        tokenPrices[token] = price;
    }

    function buyTokens(address token) external payable {
        require(msg.value > 0, "Send Ether to buy tokens");
        uint256 price = tokenPrices[token];
        require(price > 0, "Token not supported");
        uint256 amount = msg.value / price;
        balances[token][msg.sender] += amount;
        lockTimes[token][msg.sender] = block.timestamp + lockPeriod;

        emit TokensPurchased(msg.sender, token, amount);
    }

    function withdrawTokens(address token) external {
        require(block.timestamp >= lockTimes[token][msg.sender], "Tokens are locked");
        uint256 amount = balances[token][msg.sender];
        require(amount > 0, "No tokens to withdraw");

        balances[token][msg.sender] = 0;
        lockTimes[token][msg.sender] = 0;

        IERC20(token).transfer(msg.sender, amount);

        emit TokensWithdrawn(msg.sender, token, amount);
    }

    function setTokenAddress(address token, address newAddress) external {
        require(balances[token][msg.sender] > 0, "No tokens to swap");
        require(tokenPrices[newAddress] > 0, "Token not supported");
        uint256 amount = balances[token][msg.sender];
        balances[token][msg.sender] = 0;
        balances[newAddress][msg.sender] = amount;
    }
}