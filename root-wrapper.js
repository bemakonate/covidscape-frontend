import React, { useEffect } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/store/reducer';
import thunk from 'redux-thunk';
import ReduxElmt from './src/components/rootElmt/rootElmt';




const WrapWithProvider = ({ element }) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return (
        <Provider store={store}>
            <ReduxElmt>{element}</ReduxElmt>
        </Provider>
    );
}

export default WrapWithProvider;