// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract TokenSwap {
    address public token1;
    address public token2;
    address public owner;

    event Swap(address indexed from, address indexed to, uint256 amount1, uint256 amount2);

    constructor(address _token1, address _token2) {
        token1 = _token1;
        token2 = _token2;
        owner = msg.sender;
    }

    function swap(address from, address to, uint256 amount1, uint256 amount2) public {
        require(IERC20(token1).transferFrom(from, to, amount1), "Transfer of token1 failed");
        require(IERC20(token2).transferFrom(to, from, amount2), "Transfer of token2 failed");

        emit Swap(from, to, amount1, amount2);
    }
}