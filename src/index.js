exports.getNested = function getNested(record, key) {
  return key
    .split(".")
    .reduce((r, k) => (typeof r === "object" ? r?.[k] : r), record);
}
