const express = require("express");
const Data = require("../models/data");
const path = require("path")
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


// fetches all available records from our database
router.get("/datas", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// creates a new record in our database
router.post("/datas", (req, res, next) => {
  const { id, name, available, geometry } = req.body;
  let data = new Data({ id: id, name: name, geometry: geometry, available: available });

  data
    .save()
    .then(result => {
      return res.json({ success: true, id: id });
    })
    .catch(next);
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
router.post("/datas/:id", (req, res, next) => {
  const id = req.params.id;
  const { update } = req.body;
  Data.findOneAndUpdate(id).then(record => {
    return res.json({ success: true });
    // If we wanted to return the new record
    // Data.findOne(id).then((newRecord) => {
    //   return res.json({ success: true, record: newRecord })
    // })
  });
});

// deletes a record from our database
router.delete("/datas/:id", (req, res, next) => {
  const id = req.params.id;
  Data.findOneAndDelete(id).then(record => {
    return res.json({ success: true });
  });
});

module.exports = router;
