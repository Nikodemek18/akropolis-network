import { combineReducers } from 'redux';
import { ReducersMap } from 'shared/types/redux';

import * as NS from '../../namespace';
import { dataReducer } from './data';
import { communicationReducer } from './communication';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
  communication: communicationReducer,
} as ReducersMap<NS.IReduxState>);
