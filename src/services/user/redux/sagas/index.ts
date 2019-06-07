import { SagaIterator, eventChannel, EventChannel } from 'redux-saga';
import { put, takeLatest, take, select } from 'redux-saga/effects';
import * as sigUtil from 'eth-sig-util';

import { addressesEqual } from 'shared/helpers/web3';
import { IDependencies } from 'shared/types/app';
import { storageKeys } from 'services/storage';
import { getErrorMsg } from 'shared/helpers';
import { messageForSignature } from 'shared/constants';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { currentAddress$ } from '../../common';

const completeAuthenticationType: NS.ICompleteAuthentication['type'] = 'USER:COMPLETE_AUTHENTICATION';
const checkIsUserSignedType: NS.ICheckIsUserSigned['type'] = 'USER:CHECK_IS_USER_SIGNED';
const logoutType: NS.ILogout['type'] = 'USER:LOGOUT';

export function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(completeAuthenticationType, listenAccountChange);
    yield takeLatest(checkIsUserSignedType, checkIsUserSigned, deps);
    yield takeLatest(logoutType, logoutSaga, deps);
  };
}

export function* checkIsUserSigned({ drizzle, storage }: IDependencies, _a: NS.ICheckIsUserSigned) {
  try {
    const result = storage.get<string>(storageKeys.signedMessage);

    if (result) {
      const msg = drizzle.web3.utils.stringToHex(messageForSignature);
      const recovered = sigUtil.recoverPersonalSignature({
        data: msg,
        sig: result,
      });
      const drizzleState = drizzle.store.getState();
      const address = drizzleState.accounts[0];

      if (recovered.toLowerCase() === address.toLowerCase()) {
        yield put(actions.completeAuthentication(address));
      }
    }

    yield put(actions.checkIsUserSignedSuccess());

  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.checkIsUserSignedFail(message));
  }
}

export function logoutSaga({ storage }: IDependencies, _a: NS.ILogout) {
  try {
    storage.reset();
  } catch (error) {
    console.error(error);
  }
}

export function* listenAccountChange() {
  const addressChannel: EventChannel<string | null> = eventChannel((emitter) => {
    const subscription = currentAddress$.subscribe((address: string | null) => {
      emitter(address);
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  try {
    while (true) {
      const currentAddress = yield take(addressChannel);
      const confirmedAddress: ReturnType<typeof selectors.selectConfirmedAddress> =
        yield select(selectors.selectConfirmedAddress);

      if (!confirmedAddress || !addressesEqual(confirmedAddress, currentAddress)) {
        yield put(actions.logout());
        return;
      }
    }
  } catch (error) {
    //
  } finally {
    addressChannel.close();
  }
}