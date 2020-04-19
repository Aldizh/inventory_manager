const assert = require("assert");
const mongoose = require("mongoose");
const Author = require("../models/author");

describe("Nesting records", () => {
  let author;

  beforeEach(function(done) {
    author = new Author({
      name: "Milton Freedman",
      age: 45,
      books: [{ title: "Wind of change", pages: 400 }]
    });
    author.save().then(() => {
      assert(author.isNew === false);
      done();
    });
  });

  it("adds a book to an author", done => {
    author.books.push({ title: "Strive under pressure", pages: 300 });
    author.save().then(function() {
      Author.findOne({ name: "Milton Freedman" }).then(result => {
        assert(result.books.length === 2);
        done();
      });
    });
  });
});
