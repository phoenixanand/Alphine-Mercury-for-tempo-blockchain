import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { defineChain } from "viem";

/* Tempo Testnet Chain */
export const tempoTestnet = defineChain({
  id: 42429,
  name: "Tempo Testnet",
  nativeCurrency: {
    name: "USD",
    symbol: "USD",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.tempo.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Tempo Explorer",
      url: "https://explore.tempo.xyz",
    },
  },
});

/* Wagmi Config */
export const wagmiConfig = createConfig({
  chains: [tempoTestnet],
  connectors: [injected()],
  transports: {
    [tempoTestnet.id]: http(),
  },
});