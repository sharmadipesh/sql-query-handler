import React from "react";
import { TabCollection } from "../Context";

export default function Tabs() {
  const { deleteTab, memoizeData, activeNavTab, activeNavTabHandler } =
    React.useContext(TabCollection);

  if (!memoizeData?.length) {
    return;
  }

  return (
    <>
      <div className="tabs">
        {memoizeData?.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <div className="tab-btn-container">
                <button
                  key={item.name}
                  onClick={() => activeNavTabHandler(item)}
                  className={`tab ${
                    activeNavTab?.name === item.name ? "active" : ""
                  }`}
                >
                  {item.title}
                </button>
                {activeNavTab?.name === item.name ? null : (
                  <button className="delete" onClick={() => deleteTab(item)}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img src="/image/close.svg" height="12px" width="12px" />
                  </button>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}

// export default React.memo(Tabs);
