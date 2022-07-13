module.exports.checkDuplicated = (value) => {
  const duplicated = value.filter(
    (item, index) => value.indexOf(item) !== index
  );
  return !Boolean(duplicated.length);
};

