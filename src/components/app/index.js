
import React, { useEffect } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReduxElmt from '../rootElmt/rootElmt';
import cartReducer from '../../store/cart/reducer';
import layoutReducer from '../../store/layout/reducer';

const reducer = combineReducers({
    cart: cartReducer,
    layout: layoutReducer,
})


const App = ({ children }) => {
    const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return (
        <Provider store={store}>
            <ReduxElmt>{children}</ReduxElmt>
        </Provider>
    );
}

export default App;