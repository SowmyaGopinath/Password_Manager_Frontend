import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) =>state.user.isAuthenticated);
    
    return isAuthenticated ? children : <Navigate to="/LoginPage" />;
};

export default ProtectedRoute;
