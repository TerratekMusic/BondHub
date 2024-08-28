// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BondExchange {
    address public owner;
    uint256 public lockPeriod;
     struct BondInfo {
        address tokenAddress;
        uint256 tokenPrice;
        address tokenOwner;
         uint256 tokenAmount;
    }
     struct TokenBalance {
        address tokenAddress;
        uint256 balance;
    }
     mapping(address => BondInfo) public tokenDetails;
    mapping(address => mapping(address => uint256)) public balances;
    mapping(address => mapping(address => uint256)) public lockTimes;

    event BondPurchased(address indexed buyer, address indexed token, uint256 amount);
    event TokensWithdrawn(address indexed user, address indexed token, uint256 amount);
    event DebugLog(string message, uint256 balance, uint256 lockTime);

    constructor(uint256 _lockPeriod) payable {
        lockPeriod = _lockPeriod;
        owner = payable(msg.sender);
    }


 
 function setTokenDetails(address _tokenAddress, uint256 _tokenPrice,  uint256 _tokenAmount) public payable {
        // Transfer the specified amount of tokens from the msg.sender to the contract
        // require(IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _tokenAmount), "Token transfer failed");
       
             

        tokenDetails[_tokenAddress] = BondInfo({
            tokenAddress: _tokenAddress,
            tokenPrice: _tokenPrice,
            tokenOwner: msg.sender,
            tokenAmount: _tokenAmount // Store the token amount
        });
    }

function buyBond(address token) external payable {
        require(msg.value > 0, "Send Ether to buy Bonds");
       
           // Access the BondInfo struct for the given token address
        BondInfo memory bondInfo = tokenDetails[token];
        uint256 price = bondInfo.tokenPrice;
        require(price > 0, "Token not supported");
       
        uint256 amount = msg.value / price;

        
           // Debugging events    // Debugging events
      emit DebugLog("Before updating balances", balances[token][msg.sender], lockTimes[token][msg.sender]);

        balances[token][msg.sender] += amount;
        lockTimes[token][msg.sender] = block.timestamp + lockPeriod;
         // Debugging events
        emit DebugLog("After updating balances", balances[token][msg.sender], lockTimes[token][msg.sender]);

        emit BondPurchased(msg.sender, token, amount);
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

    function getTokenDetails(address _tokenAddress) public view returns (address, uint256, address) {
        BondInfo memory tokenInfo = tokenDetails[_tokenAddress];
        return (tokenInfo.tokenAddress, tokenInfo.tokenPrice, tokenInfo.tokenOwner);
    }
    
    function getBalance(address user, address token) public view returns (uint256) {
        return balances[token][user];
    }
    
    function getTokenHolders(address token) public view returns (address[] memory) {
        uint256 holderCount = 0;
        address[] memory tempHolders = new address[](1000); // Temporary array with a fixed size

        // Iterate through the outer mapping (addresses of users)
        for (uint256 i = 0; i < 1000; i++) {
            address user = address(uint160(i));
            if (balances[user][token] > 0) {
                tempHolders[holderCount] = user;
                holderCount++;
            }
        }

        // Create a dynamic array with the exact size
        address[] memory holders = new address[](holderCount);
        for (uint256 j = 0; j < holderCount; j++) {
            holders[j] = tempHolders[j];
        }

        return holders;
    }

    
}