import { task } from "hardhat/config";

task("task:getSealedResult", "Get the sealed encrypted result")
  .addParam("pubkey", "The public key to seal the result")
  .setAction(async ({ pubkey }, hre) => {
    const calculatorAddress = "0xF9930dEd12266EA09aC744802190f30eDA41BC2F";  
    const Calculator = await hre.ethers.getContractAt("Calculator", calculatorAddress);

    // Call the getSealedResult function
    const sealedResult = await Calculator.getSealedResult(pubkey);
    console.log(`Sealed Result: ${sealedResult}`);
  });
