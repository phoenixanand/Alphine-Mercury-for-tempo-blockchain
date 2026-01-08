// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20Mintable {
    function mint(address to, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}

contract TempoFaucet is Ownable {
    IERC20Mintable public token;

    uint256 public dripAmount;        // tokens per claim
    uint256 public maxBalance;        // max tokens per wallet
    uint256 public cooldown = 1 hours;

    mapping(address => uint256) public lastClaim;

    constructor(
        address tokenAddress,
        uint256 _dripAmount,
        uint256 _maxBalance
    ) {
        token = IERC20Mintable(tokenAddress);
        dripAmount = _dripAmount;
        maxBalance = _maxBalance;
    }

    function claim() external {
        // ⏱️ cooldown check
        require(
            block.timestamp >= lastClaim[msg.sender] + cooldown,
            "Cooldown active"
        );

        // 🎯 max wallet balance check
        require(
            token.balanceOf(msg.sender) + dripAmount <= maxBalance,
            "Max tokens per wallet reached"
        );

        lastClaim[msg.sender] = block.timestamp;

        token.mint(msg.sender, dripAmount);
    }

    // --- Admin controls (optional) ---
    function setDripAmount(uint256 newAmount) external onlyOwner {
        dripAmount = newAmount;
    }

    function setMaxBalance(uint256 newMax) external onlyOwner {
        maxBalance = newMax;
    }

    function setCooldown(uint256 newCooldown) external onlyOwner {
        cooldown = newCooldown;
    }
}
