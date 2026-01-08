// 

import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { formatUnits } from "viem";
import { faucetAbi } from "../abi/faucetAbi";
import { tokenAbi } from "../abi/tokenAbi";
import { tempoTestnet } from "../chains/tempo";

const FAUCET_ADDRESS = "0x322564e4d8EA0277A9D24CDae58594F2dA2d5b5b";
const TOKEN_ADDRESS = "0xEA96E79ff71DAd8333Fd73A6e2F3BA1510D04931";

export default function Faucet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const {
    writeContract,
    isPending,
    isSuccess,
    data: txHash,
    error,
  } = useWriteContract();

  // 🔍 Read user token balance
  const { data: balance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const balanceFormatted = balance
    ? formatUnits(balance as bigint, 18)
    : "0";

  const claimTokens = () => {
    writeContract({
      address: FAUCET_ADDRESS,
      abi: faucetAbi,
      functionName: "claim",
      chainId: tempoTestnet.id,
    });
  };

  return (
  <div className="faucet-card">
    <h2>🚰 Alphine mercury Faucet</h2>

    {!isConnected ? (
      <button
        className="primary-btn mt-2"
        onClick={() => connect({ connector: injected() })}
      >
        Connect Wallet
      </button>
    ) : (
      <>
        <p className="mt-2">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>

        <button
          className="secondary-btn mt-2"
          onClick={() => switchChain({ chainId: tempoTestnet.id })}
        >
          Switch to Tempo
        </button>

        <p className="mt-2">
          💰 Balance: <strong>{balanceFormatted} ALM</strong>
        </p>

        <button
          className="primary-btn mt-2"
          onClick={claimTokens}
          disabled={isPending}
        >
          {isPending ? "Claiming..." : "Claim Tokens"}
        </button>

        {isSuccess && txHash && (
          <p className="mt-2">
            ✅ Tokens claimed!
            <br />
            <a
              href={`https://explore.tempo.xyz/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Transaction
            </a>
          </p>
        )}

        {error && (
          <p className="mt-2" style={{ color: "red" }}>
            ❌ {error.message}
          </p>
        )}

        <button
          className="secondary-btn mt-3"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </>
    )}
  </div>
  );
}