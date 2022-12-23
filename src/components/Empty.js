import React from "react";
import { TabCollection } from "../Context";

export default function Empty() {
  const { activeNavTab } = React.useContext(TabCollection);

  return (
    <>
      {!activeNavTab?.name ? (
        <center>
          <h1>
            Nothing to display. Begin a new query or click on one of the tables
          </h1>
        </center>
      ) : null}
    </>
  );
}
