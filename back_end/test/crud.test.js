const assert = require("assert")
const mongoose = require("mongoose");
const Article = require("../models/article")

let document

const firstDocument = {
  id: 1000,
  name: 'Tomatoes',
  quantity: 120,
  buyPrice: 1.2,
  sellPrice: 1.5,
  category: "Produce"
}

const secondDocument = {
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
  document = new Article(firstDocument)
  document.save().then((rec) => {
    assert(rec.id === document.id)
    assert(rec.name === document.name)
    done()
  })
})

describe("test that CRUD operations are working as expected", () => {
  it("finds and reads a saved document", done => {
    Article.findOne({
      id: document.id
    }).then(result => {
      assert(result.id === document.id)
      assert(result.name === 'Tomatoes')
      done()
    })
  })

  it("creates a new document", async () => {
    const newRec = new Article(secondDocument)
    const rec2 = await newRec.save()
    assert(rec2.id === secondDocument.id)
    assert(rec2.name === secondDocument.name)
    
    const results = await Article.find({
      category: 'Produce'
    })
    assert(results.length === 2)
    
    // insert of existing records should fail
    Article.insertMany(results).then(res => assert(res.ok === 1)).catch(err => {
      assert(err.result.nInserted === 0)
    })
  })

  it("updates document using instance", done => {
    document
      .updateOne({ id: document.id, name: 'Strawberries' })
      .then(() => Article.findOne({ id: document.id }))
      .then(document => {
        assert(document.name === 'Strawberries')
        done()
      })
  })

  it("increments product quantity by 50", done => {
    Article.updateOne({ id: document.id }, { $inc: { quantity: 50 } }).then(function() {
      Article.findOne({ id: document.id }).then(function(newRecord) {
        assert(newRecord.quantity === 170)
        done()
      })
    })
  })

  it("removes first saved document by id", done => {
    Article.findOneAndRemove(document.id)
      .then(() => Article.findOne({ id: document.id }))
      .then(firstRecDeleteRes => {
        assert(firstRecDeleteRes === null)
        done()
      })
  })

  it("removes second saved document by id", done => {
    Article.findOneAndRemove(secondDocument.id)
      .then((res) => {
        return Article.findOne({ id: secondDocument.id })
      })
      .then(secondRecDeleteRes => {
        assert(secondRecDeleteRes === null)
        done()
      })
  })
})
