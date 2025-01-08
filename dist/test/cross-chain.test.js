"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fork_utils_1 = require("../utils/fork-utils");
describe("Cross-Chain Testing with Public RPCs", function () {
    it("Should fork Ethereum and fetch an account balance", async function () {
        const ethForkSpec = {
            name: "ethereum-fork",
            network: "ethereum",
            blockNumber: 17600000,
        };
        const ethProvider = await (0, fork_utils_1.createFork)(ethForkSpec);
        const accounts = await ethProvider.send("eth_accounts", []);
        console.log("Ethereum Accounts:", accounts);
        const balance = await ethProvider.send("eth_getBalance", [accounts[0], "latest"]);
        console.log(`Ethereum Balance of ${accounts[0]}: ${BigInt(balance).toString()} wei`);
    });
    it("Should fork Polygon and fetch an account balance", async function () {
        const polygonForkSpec = {
            name: "polygon-fork",
            network: "polygon",
            blockNumber: 40000000, // Example block number
        };
        const polygonProvider = await (0, fork_utils_1.createFork)(polygonForkSpec);
        const accounts = await polygonProvider.send("eth_accounts", []);
        console.log("Polygon Accounts:", accounts);
        const balance = await polygonProvider.send("eth_getBalance", [accounts[0], "latest"]);
        console.log(`Polygon Balance of ${accounts[0]}: ${BigInt(balance).toString()} wei`);
    });
});
