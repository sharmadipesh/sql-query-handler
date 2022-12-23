import React from "react";
import "../style/operation.css";
import Tabs from "./Tabs";
import Table from "./Table";
import Empty from "./Empty";

export default function Operation() {
  return (
    <>
      <div className="layout">
        <Empty />
        <Tabs />
        <Table />
      </div>
    </>
  );
}
