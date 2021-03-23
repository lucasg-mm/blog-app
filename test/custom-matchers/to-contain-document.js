const _ = require("lodash");

// checks if a object with an _id property is inside
// a array of objects with _id properties (it checks
// for equality)
module.exports = (received, expectedToBeIn) => {
  let pass = false;

  for (let i = 0; i < received.length; i++) {
    if (_.isEqual(received[i]._id, expectedToBeIn._id)) {
      pass = true;
      break;
    }
  }

  if (pass) {
    return {
      pass: true,
    };
  } else {
    return {
      pass: false,
    };
  }
};
