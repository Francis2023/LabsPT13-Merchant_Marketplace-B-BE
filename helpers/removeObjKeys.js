const removeObjKeys = (obj, keys) => {
  let newObj = {};

  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key)) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

module.exports = removeObjKeys;
