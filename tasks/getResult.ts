import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:getResult", "Gets the current encrypted result from the Calculator contract")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    // Get the deployed Calculator contract
    const CalculatorDeployment = await deployments.get("Calculator");

    const [signer] = await ethers.getSigners();
    const calculator = await ethers.getContractAt("Calculator", CalculatorDeployment.address, signer);

    const result = await calculator.getResult();
    console.log(`Current encrypted result: ${result}`);
  });
