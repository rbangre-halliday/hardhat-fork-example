import { EthereumProvider, HardhatUserConfig, HttpNetworkUserConfig } from "hardhat/types";
import { resolveConfig } from "hardhat/internal/core/config/config-resolution";
import { createProvider } from "hardhat/internal/core/providers/construction";
import * as dotenv from "dotenv";

dotenv.config();

export type ForkSpec = {
    name: string;
    network: string;
    blockNumber?: number;
};

export const config = {
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
} as HardhatUserConfig;

export async function createFork(base: ForkSpec): Promise<EthereumProvider> {
    const baseNetwork = config.networks![base.network] as HttpNetworkUserConfig;
    if (!baseNetwork) {
        throw new Error(`cannot find network config for network: ${base.network}`);
    }

    const forkedConfig = resolveConfig(".", {
        ...config,
        networks: {
            hardhat: {
                chainId: baseNetwork.chainId,
                forking: {
                    enabled: true,
                    url: baseNetwork.url!,
                    httpHeaders: {},
                    blockNumber: base.blockNumber,
                },
            },
        },
    });

    return createProvider(forkedConfig, "hardhat");
}
