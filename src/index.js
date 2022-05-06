exports.getNested = function getNested(record, key) {
  if (typeof record !== "object")
    return undefined;

  return key
    .split(".")
    .reduce((r, k) => (typeof r === "object" ? r[k] : r), record);
}
