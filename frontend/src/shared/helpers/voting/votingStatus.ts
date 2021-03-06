import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { DaoApi } from 'services/daoApi';
import { IVotingState } from 'services/daoApi/store/types';
import { IVoting, VotingStatus } from 'shared/types/models';

import calculateVotingStats from './calculateVotingStats';
import votingTimeout from './votingTimeout';

type VotingStateFields = Pick<IVotingState, 'connectedAccountVotes' | 'canVoteConnectedAccount' | 'config'>;

export const useVotingStatus = (daoApi: DaoApi, vote: IVoting) => {
  const votingStateFields = useFieldsForVotingStatus(daoApi);
  return getVotingStatus(votingStateFields, vote);
};

export const useFieldsForVotingStatus = (daoApi: DaoApi): VotingStateFields => {
  const connectedAccountVotes = useObserver(() => daoApi.store.voting.connectedAccountVotes);
  const canVoteConnectedAccount = useObserver(() => daoApi.store.voting.canVoteConnectedAccount);
  const config = useObserver(() => daoApi.store.voting.config);

  return React.useMemo(
    () => ({ connectedAccountVotes, canVoteConnectedAccount, config }),
    [connectedAccountVotes, canVoteConnectedAccount, config],
  );
};

export const getVotingStatus = (votingState: VotingStateFields, vote: IVoting): VotingStatus => {
  const { connectedAccountVotes, canVoteConnectedAccount, config } = votingState;

  const canVote = canVoteConnectedAccount[vote.id];
  const votingDecision = connectedAccountVotes[vote.id];

  const { currentResult } = calculateVotingStats(vote);
  const { isOutdated } = votingTimeout(vote.startDate, config.voteTime);
  const isRejected = calculateIsRejected(vote, config.voteTime);

  if (vote.executed) {
    return 'confirmed';
  }

  if (isRejected) {
    return 'rejected';
  }

  if (isOutdated && !vote.executed && currentResult === 'confirmed') {
    return 'execute-needed';
  }

  if (canVote && votingDecision === 'absent') {
    return 'vote-needed';
  }

  return 'pending';
};

const isOpened = (status: VotingStatus) => (
  status === 'vote-needed' || status === 'pending' || status === 'execute-needed');

export const sortByStatus = (votingState: VotingStateFields) => {
  return (a: IVoting, b: IVoting) => {
    const aIsOpened = isOpened(getVotingStatus(votingState, a));
    const bIsOpened = isOpened(getVotingStatus(votingState, b));

    if (aIsOpened && !bIsOpened) {
      return -1;
    }
    if (!aIsOpened && bIsOpened) {
      return 1;
    }
    return 0;
  };
};

export function calculateIsRejected(voting: IVoting, voteTime: number) {
  const { supportRequired } = voting;
  const { nayPercentByPower, currentResult } = calculateVotingStats(voting);
  const { isOutdated } = votingTimeout(voting.startDate, voteTime);

  const isEndedNotConfirmed = isOutdated && currentResult === 'rejected';
  const isRejectAdvanced = nayPercentByPower >= (100 - supportRequired);

  return isEndedNotConfirmed || isRejectAdvanced;
}
