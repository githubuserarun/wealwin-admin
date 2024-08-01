import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ element, ...rest }) => {
    const token = Cookie.get('jwtAdminToken');

    if (!token) {
        return <Navigate to="/admin-login" replace />;
     }
    //else{
    //     return <Navigate to="/" replace />;
    // }

    return element;
};

export default ProtectedRoute;