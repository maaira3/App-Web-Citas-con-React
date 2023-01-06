import React from 'react'
import {Route, Navigate} from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token')
    return (
        token!==null
        ?  children
        : <Navigate to =  "/" />
    );
};