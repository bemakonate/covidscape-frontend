import React, { useEffect } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReduxElmt from './src/components/rootElmt/rootElmt';

import cartReducer from './src/store/cart/reducer';
import layoutReducer from './src/store/layout/reducer';

const reducer = combineReducers({
    cart: cartReducer,
    layout: layoutReducer,
})


const WrapWithProvider = ({ element }) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return (
        <Provider store={store}>
            <ReduxElmt>{element}</ReduxElmt>
        </Provider>
    );
}

export default WrapWithProvider;