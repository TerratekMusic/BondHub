
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
        uint256 totalEthCollected;
    }
     struct TokenBalance {
        address tokenAddress;
        uint256 balance;
    }

    mapping(address => BondInfo) public tokenDetails;
    mapping(address => mapping(address => uint256)) public balances;
    mapping(address => mapping(address => uint256)) public lockTimes;

    address[] public tokenAddresses;

    event BondPurchased(address indexed buyer, address indexed token, uint256 amount);
    event TokensWithdrawn(address indexed user, address indexed token, uint256 amount);
    event DebugLog(string message, uint256 balance, uint256 lockTime);

    constructor(uint256 _lockPeriod) payable {
        lockPeriod = _lockPeriod;
        owner = payable(msg.sender);
    }


    
    function setTokenDetails(address _tokenAddress, uint256 _tokenPrice,  uint256 _tokenAmount) public payable {
            
              // Add the token address to the array if it's not already present
            if (tokenDetails[_tokenAddress].tokenAddress == address(0)) {
                    tokenAddresses.push(_tokenAddress);
                }
            // Transfer the specified amount of tokens from the msg.sender to the contract
            require(IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _tokenAmount), "Token transfer failed");
        
                

            tokenDetails[_tokenAddress] = BondInfo({
                tokenAddress: _tokenAddress,
                tokenPrice: _tokenPrice,
                tokenOwner: msg.sender,
                tokenAmount: _tokenAmount, // Store the token amount to be sold
                totalEthCollected: 0 // Initialize total ETH collected to 0
            });
        }


    function buyBond(address token) external payable {
        require(msg.value > 0, "Send Ether to buy Bonds");

        // Access the BondInfo struct for the given token address
        BondInfo storage bondInfo = tokenDetails[token]; // Use storage instead of memory
        uint256 price = bondInfo.tokenPrice;
        require(price > 0, "Token not supported");

        // Calculate the amount of tokens to be purchased
        uint256 amount = msg.value / price;

        // Ensure the contract has enough tokens
        require(amount <= bondInfo.tokenAmount, "Not enough tokens available");

        // Update total ETH collected
        bondInfo.totalEthCollected += msg.value;

            // Update the token amount in the contract
        bondInfo.tokenAmount -= amount;

        // Debugging events
        emit DebugLog("Before updating balances", balances[token][msg.sender], lockTimes[token][msg.sender]);

        // Update the balances and lock times
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

    function getTokenDetails(address _tokenAddress) public view returns (address, uint256, address, uint256) {
        BondInfo memory tokenInfo = tokenDetails[_tokenAddress];
        return (tokenInfo.tokenAddress, tokenInfo.tokenPrice, tokenInfo.tokenOwner, tokenInfo.totalEthCollected);
    }
    
    function getBalance(address user, address token) public view returns (uint256) {
        return balances[token][user];
    }
     function withdrawCollectedEth(address token) external {
        BondInfo storage bondInfo = tokenDetails[token];
        require(msg.sender == bondInfo.tokenOwner, "Only the token owner can withdraw collected ETH");

        uint256 amount = bondInfo.totalEthCollected;
        require(amount > 0, "No ETH to withdraw");

        bondInfo.totalEthCollected = 0;

        payable(msg.sender).transfer(amount);
    }

     function getAllBonds() public view returns (BondInfo[] memory) {
        BondInfo[] memory bonds = new BondInfo[](tokenAddresses.length);
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            bonds[i] = tokenDetails[tokenAddresses[i]];
        }
        return bonds;
    }


}