const assert = require("assert");
const Data = require("../models/data");

describe("test that CRUD operations are working as expected", () => {
  let record;

  beforeEach(function(done) {
    record = new Data({
      id: 1,
      name: "Jack",
      weight: 180
    });
    record.save().then(() => {
      assert(record.isNew === false);
      done();
    });
  });

  it("finds and reads a saved record", done => {
    Data.find({
      id: record.id
    }).then(results => {
      assert(results.length === 1);
      assert(results[0].id === record.id);
      assert(results[0].name === "Jack");
      done();
    });
  });

  it("updates record using instance", done => {
    record
      .update({ id: record.id, name: "Jim" })
      .then(() =>
        Data.findOne({
          id: record.id
        })
      )
      .then(record => {
        assert(record.name === "Jim");
        done();
      });
  });

  // Update operators
  it("increments weight by 5", done => {
    Data.update({}, { $inc: { weight: 5 } }).then(function() {
      Data.findOne({ id: record.id }).then(function(newRecord) {
        assert(newRecord.weight === 185);
        done();
      });
    });
  });

  it("removes a saved record by id", done => {
    Data.findOneAndRemove(record.id)
      .then(() =>
        Data.findOne({
          id: 1
        })
      )
      .then(record => {
        assert(record === null);
        done();
      });
  });
});
