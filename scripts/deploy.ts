import { ethers } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("TempoToken");

  const token = await Token.deploy(
    "Alphine mercury",
    "ALM",
    1_000_000
  );

  await token.waitForDeployment();

  const address = await token.getAddress();

  console.log("✅ TempoToken deployed at:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});