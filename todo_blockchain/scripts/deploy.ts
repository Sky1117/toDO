import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment...");

  const TaskManager = await ethers.getContractFactory("TaskManager");
  console.log("Contract factory created...");

  const taskManager = await TaskManager.deploy();
  await taskManager.deployed();
  console.log(`Contract deployed to: ${taskManager.address}`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
