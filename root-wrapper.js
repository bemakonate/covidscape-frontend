import React from 'react';
import loadable from '@loadable/component'
const App = loadable(() => import('./src/components/app'));



const WrapWithProvider = ({ element }) => {
    return <App>{element}</App>
}

export default WrapWithProvider;