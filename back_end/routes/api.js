const express = require('express')
const { v4: uuidv4 } = require("uuid");
const Article = require('../models/article')
const Sale = require('../models/sale')

const router = express.Router()

/*
 * Fetch available records from our database
 * @param {req} - Express request
 * @param {req.query} - Mongo DB query
 * @return {res} Express response
*/
router.get("/articles", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const pageNumber = req.query.pageNumber || 0
  const resultsPerPage = 10

  const articles = await Article
    .find()
      .skip(resultsPerPage * pageNumber)
      .limit(resultsPerPage)
    .catch(err => res.json({ success: false, err }))
  return res.json({ success: true, data: articles, totalCount: articles[1] });
});


/*
 * Fetch available records from our database
 * @param {req} - Express request
 * @param {req.query} - Mongo DB query
 * @return {res} Express response
*/
router.get("/articles/all", (req, res) => {
  console.log('got articles request...')
  const resPromise = Article.find({})
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
    const articles = req.body.map(article => ({
      ...article,
      id: uuidv4()
    }))
    // sanitize input here
    Article.insertMany(articles).then((data) => {
      return res.json({ success: true, data: data });
    }).catch(err => {
      return res.status(400).json({ success: false, error: err });
    })
  } else {
    const {
      name,
      quantity,
      buyPrice,
      category,
      available,
      geometry
    } = req.body;

    let data = new Article({
      id: uuidv4(),
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
  const { name, quantity, buyPrice, id } =  req.body
  Article.findOne({ id: req.params.id }).then((record) => {
    if (record.id !== null) {
      Article.updateOne({ id }, {
        name,
        quantity,
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
router.get("/sales", async (req, res) => {
  const data = await Sale.find({}).catch(err => {
    return res.json({ success: false, error: err });
  })
  return res.json({ success: true, data });
});

// get data by id
router.get("/sales/:id", (req, res, next) => {
  Sale.findOne({ id: req.params.id } ).then(data => {
    return res.json({ success: true, data });
  }).catch(err => {
    return res.json({ success: false, error: err });
  })
});


// insert one or many records in our database
router.post("/sales", (req, res, next) => {
  if (Array.isArray(req.body)) {
    const sales = req.body.map(sale => ({
      ...sale,
      id: uuidv4()
    }))
    Sale.insertMany(sales).then((data) => {
      return res.json({ success: true, data: data });
    }).catch(err => {
      return res.status(400).json({ success: false, error: err });
    })
  } else {
    const {
      name,
      quantity,
      buyPrice,
      sellPrice,
      category
    } = req.body;

    let sale = new Sale({
      id: uuidv4(),
      name,
      quantity,
      buyPrice,
      sellPrice,
      category
    });

    sale
      .save()
      .then(result => {
        return res.json({ success: true, sale });
      })
      .catch(err => {
        console.log('error creating sale', err)
        return res.status(400).json({error: 'Bad request'});
      })
  }
});

// updates an existing record in our database
router.put("/sales/:id", (req, res, next) => {
  const id = req.params.id
  const { name, quantity, buyPrice, sellPrice } = req.body
  Sale.findOne({ id }).then((record) => {
    if (record.id !== null) {
      Sale.updateOne({ id }, {
        name,
        quantity,
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

router.delete("/sales/:id", (req, res, next) => {
  const id = req.params.id
  Sale.findOne({ id }).then((sale) => {
    Sale.deleteOne({ id }).then(result => {
      return res.json({ success: true, result})
    }).catch(err => {
      return res.status(400).json({ success: false, error: err})
    })
  })
});

module.exports = router;
