const express = require("express");
const Data = require("../models/data");
const path = require("path")
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// fetches all available records from our database
router.get("/datas", (req, res) => {
  Data.find().then((data) => {
    return res.json({ success: true, data: data });
  }).catch(err => {
    return res.json({ success: false, error: err });
  })
});

// creates a new record in our database
router.post("/datas", (req, res, next) => {
  const { id, name, buyPrice, sellPrice, available, geometry } = req.body;
  let data = new Data({ id: id, name: name, buyPrice: buyPrice, sellPrice: sellPrice, geometry: geometry, available: available });

  data
    .save()
    .then(result => {
      return res.json({ success: true, id: id });
    })
    .catch(err => res.json({ success: false, error: err }));
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
  const { name, buyPrice, sellPrice, id } = req.body
  Data.updateOne({id, name, buyPrice, sellPrice}).then(record => {
    console.log('updated record', record)
    return res.json({ success: true, record})
  }).catch(err => {
    return res.json({ success: false, error: err})
  })
});

// deletes a record from our database
router.delete("/datas/:id", (req, res, next) => {
  const id = req.params.id;
  Data.findOneAndDelete(id).then(record => {
    return res.json({ success: true });
  });
});

module.exports = router;
