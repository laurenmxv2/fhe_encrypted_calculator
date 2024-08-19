// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";

contract Calculator {
    // Encrypted state variable result of type euint8
    euint8 private result;

    constructor() {
        // Initialize result to trivially encrypted 0
        result = FHE.asEuint8(0);
    }

    // Function to add an encrypted number to result
    function add(inEuint8 calldata num) public {
        result = FHE.add(result, FHE.asEuint8(num)); 
    }

    // Function to subtract an encrypted number from result
    function sub(inEuint8 calldata num) public {
        result = FHE.sub(result, FHE.asEuint8(num)); 
    }

    // Function to multiply result by an encrypted number
    function mul(inEuint8 calldata num) public {
        result = FHE.mul(result, FHE.asEuint8(num)); 
    }

    // Function to return the decrypted result
    function getResult() public view returns (uint8) {
        return FHE.decrypt(result);
    }

    // Function to return a sealed encrypted result as bytes
    function getSealedResult(bytes32 pubkey) public view returns (bytes memory) {
        string memory sealedResult = result.seal(pubkey); 
        return bytes(sealedResult);
    }

    // Function to reset the result to trivially encrypted 0
    function reset() public {
        result = FHE.asEuint8(0);
    }
}
