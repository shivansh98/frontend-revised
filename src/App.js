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
import { Provider } from "./Context/BlogContext";

const App = () => {
  return (
    <div className="App">
      <div className="bg">
        <Navigate />
        <h1 color="white">DBOI</h1>
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
    <Provider>
      <App />
    </Provider>
  );
};
