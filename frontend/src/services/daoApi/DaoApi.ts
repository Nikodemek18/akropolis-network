import { bind } from 'decko';

import { NETWORK_CONFIG } from 'core/constants/network';
import { VotingDecision } from 'shared/types/models/Voting';
import { ONE_ERC20 } from 'shared/constants';

import { IDaoApiConfig, ITransitionPeriod } from './types';
import { BaseDaoApi } from './BaseDaoApi';
import { DaoStore } from './store';
import { InvestmentsApi } from './InvestmentsApi';

const ETHER_TOKEN_FAKE_ADDRESS = '0x0000000000000000000000000000000000000000';

export class DaoApi {
  public static setConfig(config: IDaoApiConfig) {
    this.config = config;
  }

  public static async getDaoApiOrCreate(daoEnsName: string) {
    return DaoApi.daos.get(daoEnsName) || DaoApi.createDaoApi(daoEnsName);
  }

  private static daos = new Map<string, DaoApi>();
  private static config: IDaoApiConfig | null = null;

  private static async createDaoApi(daoEnsName: string) {
    if (!DaoApi.config) {
      throw new Error([
        'You need to set DaoApi config that create DaoApi.',
        'Use static method DaoApi.setConfig before creating DaoApi.',
      ].join(' '));
    }
    const daoApi = new DaoApi(DaoApi.config, daoEnsName);
    await daoApi.initialize();
    DaoApi.daos.set(daoEnsName, daoApi);
    return daoApi;
  }

  public store: DaoStore;
  public investments: InvestmentsApi;
  private base: BaseDaoApi;
  private daoEnsName: string;

  private constructor(config: IDaoApiConfig, daoEnsName: string) {
    this.base = new BaseDaoApi(config);
    this.investments = new InvestmentsApi(this.base);
    this.store = new DaoStore(this.base, this.investments);
    this.daoEnsName = daoEnsName;
  }

  @bind
  public async getTokenAddress() {
    return this.base.call('token-manager', 'token', null);
  }

  @bind
  public async joinToCooperative() {
    const account = await this.base.getAccount();

    if (!account) {
      throw new Error('Ethereum account is not found');
    }

    const params = [
      account,
      ONE_ERC20.toFixed(),
    ] as const;

    await this.base.sendTransaction('token-manager', 'mint', params);
  }

  @bind
  public async requestWithdraw(amount: number, reason: string) {
    const account = await this.base.getAccount();

    if (!account) {
      throw new Error('Ethereum account is not found');
    }

    await this.requestWithdrawTo(account, amount, reason);
  }

  @bind
  public async requestWithdrawTo(address: string, amount: number, reason: string) {
    const tokenAddress = NETWORK_CONFIG.daiContract;
    const resultAmount = ONE_ERC20.multipliedBy(amount).toFixed();
    const params = [
      tokenAddress,
      address,
      resultAmount,
      reason,
    ] as const;

    await this.base.sendTransaction('finance', 'newImmediatePayment', params);
  }

  @bind
  public async deposit(amount: number) {
    const tokenAddress = NETWORK_CONFIG.daiContract;

    const resultAmount = ONE_ERC20.multipliedBy(amount).toFixed();
    const reference = 'deposit';

    const periodDuration: string = await this.base.call('finance', 'getPeriodDuration', null);
    const currentPeriodId: string = await this.base.call('finance', 'currentPeriodId', null);
    const currentPeriod: ITransitionPeriod = await this.base.call('finance', 'getPeriod', [currentPeriodId]);

    let intentParams;

    if (tokenAddress === ETHER_TOKEN_FAKE_ADDRESS) {
      intentParams = { value: resultAmount };
    } else {
      // Get the number of period transitions necessary; we floor because we don't need to
      // transition the current period
      const lastPeriodStart = Number(currentPeriod.startTime);
      const periodTransitions = Math.floor(
        Math.max(Date.now() / 1000 - lastPeriodStart, 0) / Number(periodDuration),
      );

      intentParams = {
        token: { address: tokenAddress, value: resultAmount },
        // While it's generally a bad idea to hardcode gas in intents, in the case of token deposits
        // it prevents metamask from doing the gas estimation and telling the user that their
        // transaction will fail (before the approve is mined).
        // The actual gas cost is around ~180k + 20k per 32 chars of text + 80k per period
        // transition but we do the estimation with some breathing room in case it is being
        // forwarded (unlikely in deposit).
        gas:
          400000 +
          20000 * Math.ceil(reference.length / 32) +
          80000 * periodTransitions,
      };
    }

    const params = [
      tokenAddress,
      resultAmount,
      reference,
      intentParams,
    ] as const;

    await this.base.sendTransaction('finance', 'deposit', params);
  }

  @bind
  public async vote(voteId: string, voteType: VotingDecision) {
    const votingDecision = voteType === 'confirm';
    const params = [
      voteId,
      votingDecision,
      true,
    ] as const;

    await this.base.sendTransaction('voting', 'vote', params);
  }

  @bind
  public async executeVote(voteId: string) {
    const params = [
      voteId,
    ] as const;

    await this.base.sendTransaction('voting', 'executeVote', params);
  }

  private async initialize() {
    await this.base.setDao(this.daoEnsName);
    await this.store.initialize();
  }
}
