import React, { useState } from "react";
import Login from "./login";

import Create from "./Create";
import "./App.css";
import Navigate from "./Navigate";
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const App = () => {
  return (
    <div className="App">
      <div className="bg">
        <Navigate />
        <div style={{color:"white"}}>
        <h1>DBOI Pune</h1>
        </div>
        <HashRouter>
          <Switch>
            <Route
              path="/signin"
              component={() => {
                return <Login />;
              }}
            />
            <Route
              path="/signup"
              component={() => {
                return <Create />;
              }}
            />
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
};

export default () => {
  return (
    
      <App />
    
  );
};
