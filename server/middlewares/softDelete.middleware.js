module.exports = function softDelete(schema) {
  schema.add({
    deletedAt: Date,
    deletedBy: String
  });

  schema.pre(/^find/, function () {
    this.where({ deletedAt: null });
  });

  schema.methods.softDelete = function (userId) {
    this.deletedAt = new Date();
    this.deletedBy = userId;
    return this.save();
  };
};
