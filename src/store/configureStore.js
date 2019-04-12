import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
  );

  return store;
}

export default configureStore;