import React from "react";
import "../style/sidebar.css";
import FILENAMES from "../data";
import { TabCollection } from "../Context";

export default function Sidebar() {
  const { activeNavTabHandler, activeNavTab } = React.useContext(TabCollection);

  const activeHandler = (item) => {
    activeNavTabHandler(item);
  };
  return (
    <div className="sidebar">
      {FILENAMES?.map((file, index) => {
        return (
          <button
            key={index}
            onClick={() => activeHandler(file)}
            className={`link ${
              activeNavTab.name === file.name ? "active" : ""
            }`}
          >
            {file.title}
          </button>
        );
      })}
    </div>
  );
}
