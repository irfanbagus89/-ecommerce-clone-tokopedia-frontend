export const onlyNumberDecimal = (value) =>
  value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

export const onlyInteger = (value) => value.replace(/[^0-9]/g, "");
