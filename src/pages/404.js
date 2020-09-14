import React from 'react'
import Layout from '../components/layout/layout';
import SEO from '../components/reusable/SEO';

const errorPage = () => {
    return (
        <Layout addPadding>
            <SEO title="Error" />
            This is an error page
        </Layout>

    )
}

export default errorPage
