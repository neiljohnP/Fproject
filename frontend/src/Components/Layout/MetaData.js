import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title = 'Default Title' }) => {
    return (
        <Helmet>
            {/* Set the page title with the specified title and a default suffix */}
            <title>{`${title} - ShopIT`}</title>
        </Helmet>
    );
};

export default MetaData;
