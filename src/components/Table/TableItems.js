import React from "react";
import Loading from "../Loading";
import Search from "./Search";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

export default function TableItems({
  loading,
  fetchData,
  columns,
  data,
  apiTime,
  tableName,
  currentCollectionData,
  pageCount: controlledPageCount,
}) {
  // const [queryString, setQueryString] = React.useState(`SELECT * FROM ${tableName}`);

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)

    // pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    // filter
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      initialState: { pageIndex: 0 },
      pageCount: controlledPageCount,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      {apiTime || columns?.length ? (
        <div className="filter-container">
          {apiTime ? (
            <div className="time-stamp">
              {" "}
              Fetched {currentCollectionData?.length} results in {apiTime}{" "}
              seconds
            </div>
          ) : null}
          {columns?.length ? (
            <Search
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              useAsyncDebounce={useAsyncDebounce}
            />
          ) : null}
          {/* <textarea
            value={queryString}
            className="text-area"
            placeholder="Enter Queary String"
            onChange={(e) => setQueryString(e?.target?.value)}
          >
            {queryString}
          </textarea> */}
        </div>
      ) : null}
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img
                            src="/image/sorting-2.png"
                            height="15px"
                            width="15px"
                            style={{ marginLeft: "8px" }}
                          />
                        ) : (
                          // eslint-disable-next-line jsx-a11y/alt-text
                          <img
                            src="/image/sorting-1.png"
                            height="15px"
                            width="15px"
                            style={{ marginLeft: "8px" }}
                          />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading ? (
            <>
              <div className="loading-container">
                <Loading />
              </div>
            </>
          ) : (
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {data?.length ? (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>{" "}
          <button
            className="pagination-btn"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>{" "}
          <button
            className="pagination-btn"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </button>{" "}
          <button
            disabled={!canNextPage}
            className="pagination-btn"
            onClick={() => gotoPage(pageCount - 1)}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              className="pagination-btn"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            className="pagination-btn"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </>
  );
}

// export default React.memo(TableItems);
