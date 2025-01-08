import { createFork, ForkSpec } from "../utils/fork-utils";
import { expect } from "chai";

describe("Cross-Chain Proof of Concept", function () {
    it("Should simulate a cross-chain asset transfer and validate balances", async function () {
        // Define Ethereum Fork Spec
        const ethForkSpec: ForkSpec = {
            name: "ethereum-fork",
            network: "ethereum",
            blockNumber: 17600000, // Recent block for Ethereum
        };

        // Define Polygon Fork Spec
        const polygonForkSpec: ForkSpec = {
            name: "polygon-fork",
            network: "polygon",
            blockNumber: 40000000, // Recent block for Polygon
        };

        // Fork Ethereum and Polygon
        const ethProvider = await createFork(ethForkSpec);
        const polygonProvider = await createFork(polygonForkSpec);

        // Account to Simulate Cross-Chain Transfer
        const account = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc";

        // Set Initial Balances
        const initialEthBalance = BigInt(1e18); // 1 ETH
        const initialPolygonBalance = BigInt(0); // 0 MATIC
        await ethProvider.send("hardhat_setBalance", [account, `0x${initialEthBalance.toString(16)}`]);
        await polygonProvider.send("hardhat_setBalance", [account, `0x${initialPolygonBalance.toString(16)}`]);

        // Validate Initial Balances
        const ethBalanceBefore = BigInt(await ethProvider.send("eth_getBalance", [account, "latest"]));
        const polygonBalanceBefore = BigInt(await polygonProvider.send("eth_getBalance", [account, "latest"]));
        console.log(`Initial Ethereum Balance: ${ethBalanceBefore}`);
        console.log(`Initial Polygon Balance: ${polygonBalanceBefore}`);
        expect(ethBalanceBefore).to.equal(initialEthBalance);
        expect(polygonBalanceBefore).to.equal(initialPolygonBalance);

        // Simulate Cross-Chain Transfer
        const transferAmount = BigInt(5e17); // 0.5 ETH/MATIC
        const ethBalanceAfter = ethBalanceBefore - transferAmount;
        const polygonBalanceAfter = polygonBalanceBefore + transferAmount;

        // Adjust Balances on Forked Chains
        await ethProvider.send("hardhat_setBalance", [account, `0x${ethBalanceAfter.toString(16)}`]);
        await polygonProvider.send("hardhat_setBalance", [account, `0x${polygonBalanceAfter.toString(16)}`]);

        // Validate Final Balances
        const ethBalanceFinal = BigInt(await ethProvider.send("eth_getBalance", [account, "latest"]));
        const polygonBalanceFinal = BigInt(await polygonProvider.send("eth_getBalance", [account, "latest"]));
        console.log(`Final Ethereum Balance: ${ethBalanceFinal}`);
        console.log(`Final Polygon Balance: ${polygonBalanceFinal}`);

        // Check Balances Are Updated Correctly
        expect(ethBalanceFinal).to.equal(ethBalanceAfter);
        expect(polygonBalanceFinal).to.equal(polygonBalanceAfter);

        // Ensure Total Balance Consistency
        const totalBalanceBefore = ethBalanceBefore + polygonBalanceBefore;
        const totalBalanceAfter = ethBalanceFinal + polygonBalanceFinal;
        expect(totalBalanceBefore).to.equal(totalBalanceAfter);
    });
});
