import React from "react";
import "./app.css";
import { Consumer, Publisher } from "./components";
import { useUrlSearchParam } from "./hooks";

export const App = () => {
  const [page, setPage] = useUrlSearchParam("page");

  return (
    <>
      <div className="App_header">
        <button onClick={() => setPage("consumer")}>consumer</button>
        <button onClick={() => setPage("publisher")}>publisher</button>
      </div>

      <div>{page === "publisher" ? <Publisher /> : <Consumer />}</div>
    </>
  );
};
