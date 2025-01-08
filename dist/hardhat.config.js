"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers");
const config = {
    solidity: "0.8.18",
    networks: {
        ethereum: {
            chainId: 1,
            url: "https://cloudflare-eth.com", // Free public RPC for Ethereum Mainnet
        },
        bsc: {
            chainId: 56,
            url: "https://bsc-dataseed.binance.org", // Free public RPC for Binance Smart Chain
        },
        polygon: {
            chainId: 137,
            url: "https://polygon-rpc.com", // Free public RPC for Polygon Mainnet
        },
    },
};
exports.default = config;
