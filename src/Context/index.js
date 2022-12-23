import React from "react";
import { parseCSV } from "../utils";

export const TabCollection = React.createContext([]);

export default function ContextHandler({ children }) {
  const [memoizeData, setMemoizeData] = React.useState([]);
  const [activeNavTab,setActiveNavTab] = React.useState({})

  const deleteTab = (data) => {
    const updatedTab = memoizeData?.filter((item) => item.name !== data?.name);
    setMemoizeData(updatedTab || []);
  };

  const callBackHandler = React.useCallback((active) => {
    const startTime = Date.now();    
    fetch(
      `https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${active.name}.csv?ref=master`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const seconds = elapsedTime/1000;
        const data = parseCSV(atob(res.content));

        let finalData = {
          ...active,
          seconds,
          data:data || []
        }
        setActiveNavTab(() => ({...(finalData) || {}}));
        setMemoizeData([...memoizeData,finalData]);
      });
  })

  const activeNavTabHandler = async (data) => {
    const navData = memoizeData?.find((item) => item.name === data?.name);
    if(navData?.name){
      setActiveNavTab(navData);
    }else{
      callBackHandler(data);
    }
  }
  
  return (
    <>
      <TabCollection.Provider
        value={{
          deleteTab,
          memoizeData,
          activeNavTab,
          activeNavTabHandler,
        }}
      >
        {children}
      </TabCollection.Provider>
    </>
  );
}
