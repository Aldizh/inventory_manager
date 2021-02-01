const assert = require("assert")
const Data = require("../models/data")

let record

const firstRecord = {
  id: 0,
  name: 'Kiwis',
  quantity: 120,
  buyPrice: 1.2,
  sellPrice: 1.5,
  category: 'large'
}

const secondRecord = {
  id: 1,
  name: 'Oranges',
  quantity: 10,
  buyPrice: 1.10,
  sellPrice: 1.20,
  category: 'large'
}

beforeEach(function(done) {
  record = new Data(firstRecord)
  record.save().then((rec) => {
    assert(rec.id === record.id)
    assert(rec.name === record.name)
    newRec = new Data(secondRecord)
    newRec.save().then(rec2 => {
      assert(rec2.id === secondRecord.id)
      assert(rec2.name === secondRecord.name)
      done()
    })
  })
})

describe("test that CRUD operations are working as expected", () => {
  it("finds and reads a saved record", done => {
    Data.find({
      id: record.id
    }).then(results => {
      assert(results.length === 1)
      assert(results[0].id === record.id)
      assert(results[0].name === 'Kiwis')
      assert(results[0].category === 'large')
      done()
    })
  })

  it("should find two records with large category", done => {
    Data.find({
      category: 'large'
    }).then(results => {
      assert(results.length === 2)
      done()
    })
  })

  it("updates record using instance", done => {
    record
      .updateOne({ id: record.id, name: 'Strawberries' })
      .then(() => Data.findOne({ id: record.id }))
      .then(record => {
        assert(record.name === 'Strawberries')
        done()
      })
  })

  it("increments quantity by 50", done => {
    Data.updateOne({ id: record.id }, {$inc: { quantity: 50 } }).then(function() {
      Data.findOne({ id: record.id }).then(function(newRecord) {
        assert(newRecord.quantity === 170)
        done()
      })
    })
  })

  it("creates a second record", done => {
    record = new Data(secondRecord)
    record.save().then(record => {
      assert(record.id === secondRecord.id)
      assert(record.name === secondRecord.name)
      done()
    })
  })

  it("removes a saved record by id", done => {
    Data.findOneAndRemove(record.id)
      .then(() => Data.findOne({ id: 0 }))
      .then(record => {
        assert(record === null)
        done()
      })
  })
})
