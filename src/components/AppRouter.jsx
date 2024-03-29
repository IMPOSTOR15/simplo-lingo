import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
const AppRouter = observer(() => {
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
      </Routes>
  );
});

export default AppRouter;