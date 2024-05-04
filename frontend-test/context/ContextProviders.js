import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo/apolloClient'; 
import { AuthProvider } from '../context/AuthContext';

export const ContextProviders = ({ children }) => {

    return (
        <AuthProvider>
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
        </AuthProvider>

    );
};

ContextProviders.propTypes = {
    children: PropTypes.node,
    pageProps: PropTypes.object
};
