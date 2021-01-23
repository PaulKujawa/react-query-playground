import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ReactQueryClient } from "./lib";
import { QueryClientProvider } from "react-query";
import "regenerator-runtime/runtime";
import { App } from "./App";

const Index = () => (
  <QueryClientProvider client={ReactQueryClient}>
    <App />
  </QueryClientProvider>
);

ReactDOM.render(<Index />, document.getElementById("root"));
