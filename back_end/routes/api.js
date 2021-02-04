const express = require('express')
const path = require('path')
const Data = require('../models/data')
const Sale = require('../models/sale')

const router = express.Router()

// fetches all available records from our database
router.get("/datas", (req, res) => {
  Data.find().then((data) => {
    return res.json({ success: true, data: data });
  }).catch(err => {
    return res.json({ success: false, error: err });
  })
});

// insert one or many records in our database
router.post("/datas", (req, res, next) => {
  if (Array.isArray(req.body)) {
    Data.insertMany(req.body).then((data) => {
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

    let data = new Data({
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
        return res.status(400).json({error: 'Bad request'});
      })
  }
});

// get data by id
router.get("/datas/:id", (req, res, next) => {
  Data.findById(req.params.id).then(record => {
    return res.json({ success: true, record });
  }).catch(err => {
    return res.json({ success: false, error: err });
  })
});

// // fetches records using url parameters
// router.get("/datas", (req, res, next) => {
//   Data.aggregate([
//     {
//       $geoNear: {
//         near: { type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
//         maxDistance: 100000,
//         distanceField: "dist",
//         spherical: true
//       }
//     }
//   ])
//     .then(results => {
//       console.log("results: ", results);
//       return res.json({ success: true, data: results });
//     })
//     .catch(next);
// });

// updates an existing record in our database
router.patch("/datas/:id", (req, res, next) => {
  const { name, qunatity, buyPrice, id } = req.body
  Data.find({ id }).then((records) => {
    const record = records[0]
    if (record.id !== null) {
      Data.updateOne({ id }, {
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
router.delete("/datas/:id", (req, res, next) => {
  const id = req.params.id;
  Data.find({ id }).then((records) => {
    const record = records[0]
    if (record.id !== null) {
      Data.deleteOne({ id }).then(record => {
        return res.json({ success: true, record})
      }).catch(err => {
        return res.json({ success: false, error: err})
      })
    } else return res.status(400).json({ success: false, error: "This record does not exist" });
  })
});

// deletes all records from our database
router.delete("/datas", (req, res, next) => {
  Data.deleteMany({}).then(data => {
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
