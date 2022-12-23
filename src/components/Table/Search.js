import React from "react";

export default function Search({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  useAsyncDebounce
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div>
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="pagination-btn"
        placeholder={`Search records...`}
      />
    </div>
  )
}
// export default React.memo(Search);
