import React from "react";

function Search({
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
    <>
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="text-field search"
        placeholder={`Search records...`}
      />
    </>
  )
}
export default React.memo(Search);
