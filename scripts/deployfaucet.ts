import { ethers } from "hardhat";

async function main() {
  const TOKEN_ADDRESS = "0xEA96E79ff71DAd8333Fd73A6e2F3BA1510D04931";

  const Faucet = await ethers.getContractFactory("TempoFaucet");

  const faucet = await Faucet.deploy(
    TOKEN_ADDRESS,
    ethers.parseUnits("10", 18),   // 👈 dripAmount (10 tokens)
    ethers.parseUnits("10000000", 18)   // 👈 maxBalance (100 tokens)
  );

  await faucet.waitForDeployment();

  console.log("🚰 Faucet deployed at:", await faucet.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});