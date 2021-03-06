import { IpfsConfig } from '@aragon/apm';
import { InvestmentType } from 'shared/types/models';
import { toWei } from 'shared/helpers/web3';
import { NULL_ADDRESS } from 'shared/constants';
import getEnvParams from '../getEnvParams';

interface INetworkConfig {
  id: number;
  type: string; // 'main' | 'kovan' | ...
  rpcUrl: string;
  daiContract: string;
  compoundAccountApiUrl: string;
  aktContract: string;
  c2fcContract: string;
  aragonEnsRegistry: string;
  defaultEthNode: string;
  defaultIpfsConfig: IpfsConfig;
  etherscanDomain: string;
  investments: Record<InvestmentType, string>;
}

const networkConfigs: Record<string, INetworkConfig> = {
  '4': {
    id: 4,
    type: 'rinkeby',
    rpcUrl: 'https://rinkeby.infura.io/',
    daiContract: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    investments: {
      compound: '0x6d7f0754ffeb405d23c51ce938289d4835be3b14',
    },
    compoundAccountApiUrl: 'https://api.stage.compound.finance/api/v2/account',
    aktContract: NULL_ADDRESS,
    c2fcContract: '0xb272fA8bD66fbD310165d322Febd5e275081f886',
    aragonEnsRegistry: '0x98df287b6c145399aaa709692c8d308357bc085d',
    defaultEthNode: 'wss://rinkeby.eth.aragon.network/ws',
    defaultIpfsConfig: {
      gateway: 'https://ipfs.eth.aragon.network/ipfs',
    },
    etherscanDomain: 'https://rinkeby.etherscan.io/address/',
  },
  '42': {
    id: 42,
    type: 'kovan',
    rpcUrl: 'https://kovan.infura.io/',
    daiContract: '0xC4375B7De8af5a38a93548eb8453a498222C4fF2',
    investments: {
      compound: NULL_ADDRESS,
    },
    compoundAccountApiUrl: '',
    aktContract: '0xcfd6e4044dd6e6ce64aed0711f849c7b9134d7db',
    c2fcContract: '0xb272fA8bD66fbD310165d322Febd5e275081f886',
    aragonEnsRegistry: NULL_ADDRESS,
    defaultEthNode: NULL_ADDRESS,
    defaultIpfsConfig: {
      gateway: 'https://ipfs.eth.aragon.network/ipfs',
    },
    etherscanDomain: 'https://kovan.etherscan.io/address/',

  },
  '1': {
    id: 1,
    type: 'main',
    rpcUrl: 'https://mainnet.infura.io/',
    daiContract: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    investments: {
      compound: NULL_ADDRESS,
    },
    compoundAccountApiUrl: '',
    aktContract: NULL_ADDRESS,
    c2fcContract: NULL_ADDRESS,
    aragonEnsRegistry: '0x314159265dd8dbb310642f98f50c066173c1259b',
    defaultEthNode: 'wss://mainnet.eth.aragon.network/ws',
    defaultIpfsConfig: {
      gateway: 'https://ipfs.eth.aragon.network/ipfs',
    },
    etherscanDomain: 'https://etherscan.io/address/',
  },
};

export const NETWORK_CONFIG = networkConfigs[getEnvParams().network];

export const defaultGasPriceFn =
  NETWORK_CONFIG.id === 1
    ? () => void 0 // On mainnet rely on the provider's gas estimation
    : () => toWei('10', 'gwei'); // on all other networks just hardcode it
