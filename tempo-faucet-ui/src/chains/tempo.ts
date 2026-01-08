import { defineChain } from "viem";

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
      // webSocket: ["wss://rpc.testnet.tempo.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Tempo Explorer",
      url: "https://explore.tempo.xyz",
    },
  },
});