import React from "react";
import "./app.css";
import { Consumer, Publisher } from "./components";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App_header">
        <Link to="/consumer">consumer</Link>
        <Link to="/publisher">publisher</Link>
      </div>

      <Switch>
        <Route path="/consumer">
          <Consumer />
        </Route>
        <Route path="/publisher">
          <Publisher />
        </Route>
        <Route path="/">
          <Consumer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
