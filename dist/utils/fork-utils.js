"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.createFork = createFork;
const config_resolution_1 = require("hardhat/internal/core/config/config-resolution");
const construction_1 = require("hardhat/internal/core/providers/construction");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.config = {
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
async function createFork(base) {
    const baseNetwork = exports.config.networks[base.network];
    if (!baseNetwork) {
        throw new Error(`cannot find network config for network: ${base.network}`);
    }
    const forkedConfig = (0, config_resolution_1.resolveConfig)(".", {
        ...exports.config,
        networks: {
            hardhat: {
                chainId: baseNetwork.chainId,
                forking: {
                    enabled: true,
                    url: baseNetwork.url,
                    httpHeaders: {},
                    blockNumber: base.blockNumber,
                },
            },
        },
    });
    return (0, construction_1.createProvider)(forkedConfig, "hardhat");
}
