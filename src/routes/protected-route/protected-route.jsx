import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import {PATHS} from "../../constants/paths";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth);

    return isAuthenticated  ? children : <Navigate to={PATHS.ROOT} />;
};
