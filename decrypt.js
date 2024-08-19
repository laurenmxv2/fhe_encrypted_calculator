const { FhenixClient } = require("@fhenixprotocol/fhenix.js");

async function decryptSealedResult(sealedResult, privateKey) {
  // Initialize FhenixClient with the user's private key
  const client = new FhenixClient({ privateKey });

  // Decrypt the sealed result using the private key
  const decryptedResult = await client.decrypt(sealedResult);

  console.log(`Decrypted Result: ${decryptedResult}`);
}

// Example usage
const sealedResult = "0x..."; // Replace with the actual sealed result from the contract
const privateKey = "0x..."; // Replace with the actual user's private key

decryptSealedResult(sealedResult, privateKey);
