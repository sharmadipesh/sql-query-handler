export const parseCSV = (text, rowDelimiter = "\n", entryDelimiter = ",") => {
  const lines = text.split(rowDelimiter);
  const headers = lines[0].split(entryDelimiter);
  const rows = [];
  lines.slice(1, lines.length - 1).forEach((line) => {
    const entries = line.split(entryDelimiter);
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = index < entries.length ? entries[index] : null;
    });
    rows.push(obj);
  });
  return rows;
};