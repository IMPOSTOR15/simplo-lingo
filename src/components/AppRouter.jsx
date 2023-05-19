import React, { useContext } from 'react';
// import {Swith, Router, Redirect} from 'react-router-dom'
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../index';
const AppRouter = () => {
    // const isAuth = false
    const {user} = useContext(Context)
    return (
        <Routes>   
          {user.isAuth && authRoutes.map(route => 
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
              exact={route.exact}
            />
          )}
          {publicRoutes.map(route => 
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
              exact={route.exact}
            />
          )}
          <Route path="/login" element={user.isAuth ? <Navigate to="/" /> : <Navigate to="/login"/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes> 
    );
};

export default AppRouter;