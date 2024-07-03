import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";

async function main() {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const ONE_GWEI = 1_000_000_000;

  const lockedAmount = ONE_GWEI;

  const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
  const [owner, otherAccount] = await ethers.getSigners();

  const Lock = await ethers.getContractFactory("Lock");
  const lockInstance = await Lock.deploy(unlockTime);
  await lockInstance.waitForDeployment();

  console.log("Lock contract deployed at: ", lockInstance.target);
}

main().catch(console.error);
