// Plugins
import "./tasks/add";
import "./tasks/sub";
import "./tasks/mul";
import "./tasks/getSealedResult";
import "./tasks/getResult";


import "@nomiclabs/hardhat-ethers"; 
import { config as dotenvConfig } from "dotenv";
import "fhenix-hardhat-docker";
import "fhenix-hardhat-plugin";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";
import { resolve } from "path";

// Set up environment variables
const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const TESTNET_CHAIN_ID = 8008135;
const TESTNET_RPC_URL = "https://api.helium.fhenix.zone";

// Configure testnet network settings
const testnetConfig: any = {
  chainId: TESTNET_CHAIN_ID,
  url: TESTNET_RPC_URL,
};

// Handle both private keys and mnemonics
const keys = process.env.KEY;
if (!keys) {
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error("No mnemonic or private key provided. Please set MNEMONIC or KEY in your .env file.");
  }
  // Configure mnemonic-based accounts
  testnetConfig.accounts = {
    count: 10,
    mnemonic,
    path: "m/44'/60'/0'/0",  // BIP44 Ethereum path
  };
} else {
  // Configure key-based accounts
  testnetConfig.accounts = [keys];
}

// Hardhat configuration
const config: HardhatUserConfig = {
  solidity: "0.8.25",
  defaultNetwork: "localfhenix",  // Default to the local Fhenix testnet
  networks: {
    localfhenix: {
      url: "http://127.0.0.1:42069",  // LocalFhenix RPC URL
      accounts: { mnemonic: process.env.MNEMONIC },  // Accounts for local network from mnemonic
    },
    testnet: testnetConfig,
  },
  paths: {
    sources: "./contracts",  // Source directory for contracts
    tests: "./test",  // Directory for tests
    cache: "./cache",  // Directory for cache files
    artifacts: "./artifacts",  // Directory for artifacts
  },
  mocha: {
    timeout: 20000,  // Timeout for Mocha tests (20 seconds)
  },
};

export default config;
