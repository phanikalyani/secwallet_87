import { WEB3AUTH_NETWORK } from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3authContextConfig/modal/react";

const clientId = "BP4HL2K1YQXPndIE8oJrtG2WFt1U02HoeQ-KEig5WTkt_W-fxFtxvmUv0E2PHpOQw_p5CrjqGwCwn6MCPiP50gI"; // get from https://dashboard.web3auth.io

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  }
};

export default web3AuthContextConfig;