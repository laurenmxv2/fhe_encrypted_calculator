import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:subtract")
  .addParam("amount", "Amount to subtract from the encrypted result", "1")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { fhenixjs, ethers, deployments } = hre;

    // Get the signers using ethers.js v5
    const [signer] = await ethers.getSigners();

    // Check if the signer has a balance and top up if necessary
    if ((await signer.getBalance()).isZero()) {
      await fhenixjs.getFunds(signer.address);
    }

    const amountToSubtract = Number(taskArguments.amount);

    // Get the deployed Calculator contract
    const CalculatorDeployment = await deployments.get("Calculator");

    console.log(
      `Running subtract(${amountToSubtract}), targeting contract at: ${CalculatorDeployment.address}`
    );

    // Access the deployed Calculator contract
    const calculator = await ethers.getContractAt(
      "Calculator",
      CalculatorDeployment.address,
      signer
    );

    // Encrypt the input amount using fhenixjs
    const encryptedAmount = await fhenixjs.encrypt_uint8(amountToSubtract);

    try {
      // Call the `subtract` function on the contract with the encrypted amount
      const txResponse = await calculator.sub(encryptedAmount);

      // Wait for the transaction to be confirmed
      const receipt = await txResponse.wait();
      console.log(`Transaction confirmed with hash: ${receipt.transactionHash}`);
    } catch (e) {
      console.log(`Failed to send subtract transaction: ${e}`);
    }
  });
