// default options for the schemas
module.exports = () => {
  return {
    id: false,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  };
};
