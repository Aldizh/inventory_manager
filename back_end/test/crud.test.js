const assert = require("assert")
const mongoose = require("mongoose");
const Article = require("../models/article")

let record

const firstRecord = {
  id: 1000,
  name: 'Tomatoes',
  quantity: 120,
  buyPrice: 1.2,
  sellPrice: 1.5,
  category: "Produce"
}

const secondRecord = {
  id: 1001,
  name: 'Cucumber',
  quantity: 10,
  buyPrice: 1.10,
  sellPrice: 1.20,
  category: "Produce"
}

beforeEach(function(done) {
  // Drop the collection before each test
  // * Make sure it is only a test db
  mongoose.connection.collections.articles.drop(function() {
    done();
  });
})


beforeEach(function(done) {
  record = new Article(firstRecord)
  record.save().then((rec) => {
    assert(rec.id === record.id)
    assert(rec.name === record.name)
    done()
  })
})

describe("test that CRUD operations are working as expected", () => {
  it("finds and reads a saved record", done => {
    Article.findOne({
      id: record.id
    }).then(result => {
      assert(result.id === record.id)
      assert(result.name === 'Tomatoes')
      done()
    })
  })

  it("creates a new record", async () => {
    const newRec = new Article(secondRecord)
    const rec2 = await newRec.save()
    assert(rec2.id === secondRecord.id)
    assert(rec2.name === secondRecord.name)
    
    const results = await Article.find({
      category: 'Produce'
    })
    assert(results.length === 2)
    
    // insert of existing records should fail
    Article.insertMany(results).then(res => assert(res.ok === 1)).catch(err => {
      assert(err.result.nInserted === 0)
    })
  })

  it("updates record using instance", done => {
    record
      .updateOne({ id: record.id, name: 'Strawberries' })
      .then(() => Article.findOne({ id: record.id }))
      .then(record => {
        assert(record.name === 'Strawberries')
        done()
      })
  })

  it("increments product quantity by 50", done => {
    Article.updateOne({ id: record.id }, { $inc: { quantity: 50 } }).then(function() {
      Article.findOne({ id: record.id }).then(function(newRecord) {
        assert(newRecord.quantity === 170)
        done()
      })
    })
  })

  it("removes first saved record by id", done => {
    Article.findOneAndRemove(record.id)
      .then(() => Article.findOne({ id: record.id }))
      .then(firstRecDeleteRes => {
        assert(firstRecDeleteRes === null)
        done()
      })
  })

  it("removes second saved record by id", done => {
    Article.findOneAndRemove(secondRecord.id)
      .then((res) => {
        return Article.findOne({ id: secondRecord.id })
      })
      .then(secondRecDeleteRes => {
        assert(secondRecDeleteRes === null)
        done()
      })
  })
})
