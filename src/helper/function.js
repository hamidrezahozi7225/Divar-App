const _ = require("lodash");

export const paginate = (data, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return _(data).slice(startIndex).take(pageSize).value();
};
