// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Staking {
    IERC20 public stakingToken;
    address public owner;
    uint256 public rewardRate; // Reward rate per block

    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public rewardBalance;
    mapping(address => uint256) public lastUpdateBlock;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);

    constructor(address _stakingToken, uint256 _rewardRate) {
        stakingToken = IERC20(_stakingToken);
        owner = msg.sender;
        rewardRate = _rewardRate;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function stake(uint256 amount) external {
        updateReward(msg.sender);
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakingBalance[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(stakingBalance[msg.sender] >= amount, "Insufficient balance");
        updateReward(msg.sender);
        stakingBalance[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function claimReward() external {
        updateReward(msg.sender);
        uint256 reward = rewardBalance[msg.sender];
        rewardBalance[msg.sender] = 0;
        stakingToken.transfer(msg.sender, reward);
        emit RewardClaimed(msg.sender, reward);
    }

    function updateReward(address account) internal {
        uint256 blocks = block.number - lastUpdateBlock[account];
        rewardBalance[account] += stakingBalance[account] * blocks * rewardRate;
        lastUpdateBlock[account] = block.number;
    }

    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
    }
}