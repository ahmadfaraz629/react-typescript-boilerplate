import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import rootReducer from './rootReducer';
import SagaManager from 'store/sagas/SagaManager';
export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  SagaManager.startSagas(sagaMiddleware);
  return store;
}
