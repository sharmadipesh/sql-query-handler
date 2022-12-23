import React from "react";
import { TabCollection } from "../../Context";
import TableItems from "./TableItems";

export default function Table() {
  const fetchIdRef = React.useRef(0);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);

  const { activeNavTab } = React.useContext(TabCollection);

  const columns = React.useMemo(() => {
    const keys = Object.keys(activeNavTab?.data?.[0] || {}).map((item) => {
      return {
        Header: item,
        accessor: item,
      };
    });
    return keys || {};
  }, [activeNavTab]);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          setData(() => [
            ...(activeNavTab?.data?.slice(startRow, endRow) || []),
          ]);
          setPageCount(() => Math.ceil(activeNavTab?.data?.length / pageSize));
          setLoading(false);
        }
      }, 1000);
    },
    [columns]
  );

  return (
    <>
      <TableItems
        data={data}
        columns={columns}
        loading={loading}
        pageCount={pageCount}
        fetchData={fetchData}
        key={activeNavTab?.name}
        tableName={activeNavTab?.name}
        apiTime={activeNavTab?.seconds}
        currentCollectionData={activeNavTab?.data || []}
      />
    </>
  );
}
