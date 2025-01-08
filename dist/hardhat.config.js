"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers");
const config = {
    solidity: "0.8.18",
    networks: {
        hardhat: {
            forking: {
                url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
                blockNumber: 17600000,
            },
        },
    },
};
exports.default = config;
