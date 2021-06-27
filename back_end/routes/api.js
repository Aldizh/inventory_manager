const express = require('express')
const path = require('path')
const Article = require('../models/article')
const Sale = require('../models/sale')

const router = express.Router()

/*
 * Fetch available records from our database
 * @param {req} - Express request
 * @param {req.query} - Mongo DB query
 * @return {res} Express response
*/
router.get("/articles", (req, res) => {
  const pageNumber = req.query.pageNumber || 0
  const resultsPerPage = 10
  const resPromise = Article.find()
    .skip(resultsPerPage * pageNumber)
    .limit(resultsPerPage)
  const countPromise = Article.find().countDocuments()
  Promise.all([resPromise, countPromise])
    .then((results) => {
      return res.json({ success: true, data: results[0], totalCount: results[1] });
    }).catch(err => {
      console.log('err', err)
      return res.json({ success: false, error: err });
    })
});

// insert one or many records in our database
router.post("/articles", (req, res, next) => {
  if (Array.isArray(req.body)) {
    Article.insertMany(req.body).then((data) => {
      return res.json({ success: true, data: data });
    }).catch(err => {
      return res.status(400).json({ success: false, error: err });
    })
  } else {
    const {
      id,
      name,
      quantity,
      buyPrice,
      category,
      available,
      geometry
    } = req.body;

    let data = new Article({
      id,
      name,
      quantity,
      buyPrice,
      category,
      geometry,
      available
    });

    data
      .save()
      .then(result => {
        console.log('result')
        return res.json({ success: true, id: id });
      })
      .catch(err => {
        console.log('err', err)
        return res.status(400).json({error: 'Bad request'});
      })
  }
});

// get data by id
router.get("/articles/:id", (req, res, next) => {
  Article.find({ id: req.params.id }).then((records) => {
    return res.json({ success: true, data: records[0] });
  }).catch(err => {
    return res.json({ success: false, error: err });
  })
});

// updates an existing record in our database
router.put("/articles/:id", (req, res, next) => {
  const { name, qunatity, buyPrice, id } =  req.body
  Article.findOne({ id: req.params.id }).then((record) => {
    if (record.id !== null) {
      Article.updateOne({ id }, {
        name,
        qunatity,
        buyPrice
      }).then(record => {
        return res.json({ success: true, record})
      }).catch(err => {
        return res.status(400).json({ success: false, error: err})
      })
    } else return res.status(400).json({ success: false, error: "This record does not exist" });
  })
});

// deletes a record from our database
router.delete("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find({ id }).then((records) => {
    const record = records[0]
    if (record.id !== null) {
      Article.deleteOne({ id }).then(record => {
        return res.json({ success: true, record})
      }).catch(err => {
        return res.json({ success: false, error: err})
      })
    } else return res.status(400).json({ success: false, error: "This record does not exist" });
  })
});

// deletes all records from our database
router.delete("/articles", (req, res, next) => {
  Article.deleteMany({}).then(data => {
    return res.status(200).json({ success: true, deleteCount: data.deleteCount})
  }).catch(err => {
    return res.status(400).json({ success: false, error: err})
  })
});


// SALES ROUTES
// fetches all available records from our database
router.get("/sales", (req, res) => {
  Sale.find().then((data) => {
    return res.json({ success: true, data: data });
  }).catch(err => {
    return res.json({ success: false, error: err });
  })
});

// get data by id
router.get("/sales/:id", (req, res, next) => {
  Sale.find({ saleId: req.params.id } ).then(data => {
    return res.json({ success: true, data });
  }).catch(err => {
    return res.json({ success: false, error: err });
  })
});


// insert one or many records in our database
router.post("/sales", (req, res, next) => {
  if (Array.isArray(req.body)) {
    Sale.insertMany(req.body).then((data) => {
      return res.json({ success: true, data: data });
    }).catch(err => {
      return res.status(400).json({ success: false, error: err });
    })
  } else {
    const {
      saleId,
      name,
      quantity,
      buyPrice,
      sellPrice,
      category
    } = req.body;

    let data = new Sale({
      saleId,
      name,
      quantity,
      buyPrice,
      sellPrice,
      category
    });

    data
      .save()
      .then(result => {
        return res.json({ success: true, saleId });
      })
      .catch(err => {
        return res.status(400).json({error: 'Bad request'});
      })
  }
});

// updates an existing record in our database
router.put("/sales/:id", (req, res, next) => {
  const { name, qunatity, buyPrice, sellPrice, saleId } = req.body
  Sale.find({ saleId }).then((records) => {
    const record = records[0]
    if (record.saleId !== null) {
      Sale.updateOne({ saleId }, {
        name,
        qunatity,
        buyPrice,
        sellPrice
      }).then(record => {
        return res.json({ success: true, record})
      }).catch(err => {
        return res.status(400).json({ success: false, error: err})
      })
    } else return res.status(400).json({ success: false, error: "This record does not exist" });
  })
});

module.exports = router;
