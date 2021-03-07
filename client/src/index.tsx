import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { App } from "./App";
import "./index.css";
import { ReactQueryClient } from "./lib";

const Index = () => (
  <QueryClientProvider client={ReactQueryClient}>
    <App />
  </QueryClientProvider>
);

ReactDOM.render(<Index />, document.getElementById("root"));
