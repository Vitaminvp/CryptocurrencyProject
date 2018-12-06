import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../redusers';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import currencySaga from '../AC/sagaCurrency';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware)
    // other store enhancers if any
);

const store = createStore(
    reducers,
    enhancer,
);

sagaMiddleware.run(currencySaga);

window.store = store;

export default store;
