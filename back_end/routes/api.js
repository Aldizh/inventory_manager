const express = require('express');
const mongoose = require("mongoose");
const { google } = require('googleapis');
const jwt = require("jsonwebtoken")
require("dotenv").config() // to use process.env

const Article = require('../models/article')
const Sale = require('../models/sale')

const router = express.Router()
const OAuth2 = google.auth.OAuth2;

let baseURL = process.env.HOST

if (process.env.NODE_ENV === "development") {
  baseURL = `${baseURL}:3006`
}

const CONFIG = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: process.env.JWT_SECRET,
  baseURL,
  // The credentials and information for OAuth2
  oauth2Credentials: {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID, // The name of your project
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [
      `${baseURL}/login`
    ],
    scopes: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
      // any other scopes you might require. View all here - https://developers.google.com/identity/protocols/oauth2/scopes
    ],
  }
};

const oauth2Client = new OAuth2(
  CONFIG.oauth2Credentials.client_id,
  CONFIG.oauth2Credentials.client_secret,
  CONFIG.oauth2Credentials.redirect_uris[0]
);

router.get("/login", async (req, res) => {
  // obtain the google login link which we'll send our users
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
    scope: CONFIG.oauth2Credentials.scopes // Using the access scopes from our config file
  });

  return res.json({ success: true, authUrl });
});

router.get('/auth_callback', function (req, res) {
  // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]
  );
  if (req.query?.code) {
    return oauth2Client.getToken(req.query.code, function(err, data) {
      if (err) console.log(err.message)

      // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
      const token = jwt.sign({
        client: CONFIG.oauth2Credentials.client_id
      }, CONFIG.JWTsecret, { expiresIn: "1h" });
      res.cookie('token', token, {
        httpOnly: true,
        // secure: true
      }).json({ success: true, data });
    });
  } else return res.status(400).json({ success: false, msg: "No code provided" })
})

/*
 * Fetch available records from our database
 * @param {req} - Express request
 * @param {req.query} - Mongo DB query
 * @return {res} Express response
*/
router.get("/articles", async (req, res) => {
  const pageNumber = req.query.pageNumber || 0
  const resultsPerPage = 10

  const articles = await Article
    .find({})
      .skip(resultsPerPage * pageNumber)
      .limit(resultsPerPage)
    .catch(err => res.json({ success: false, data: [], err }))

  return res.json({ success: true, data: articles });
});

/*
 * Fetch available records from our database
 * @param {req} - Express request
 * @param {req.query} - Mongo DB query
 * @return {res} Express response
*/
router.get("/articles/all", async (req, res) => {
  const articles = await Article
    .find()
    .catch(err => {
      console.log('Error fetching articles...', err.message)
      return res.json({ success: false, data: [], error: err });
    })
  return res.json({ success: true, data: articles });
});

// insert one or many records in our database
router.post("/articles", (req, res, next) => {
  if (Array.isArray(req.body)) {
    Article.insertMany(req.body).then((data) => {
      return res.json({ success: true, data });
    }).catch(err => {
      return res.status(400).json({ success: false, data: [], error: err });
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
        return res.json({ success: true, data: result });
      })
      .catch(err => {
        console.log('Error saving articles...', err.message)
        return res.status(400).json({ error: 'Bad request' });
      })
  }
});

// get data by id
router.get("/articles/:id", (req, res, next) => {
  const { id } = req.params
  const objectId = new mongoose.Types.ObjectId(id)

  Article
    .findById(objectId).exec()
    .then((article) => res.json({ success: true, data: article }))
    .catch(err => res.json({ success: false, data: [], err }))
});

// updates an existing record in our database
router.put("/articles/:id", (req, res, next) => {
  const { name, quantity, buyPrice } =  req.body
  const { id } = req.params
  const objectId = new mongoose.Types.ObjectId(id)

  Article
    .findById(objectId).exec()
    .then((article) => {
      if (article.id) {
        Article.updateOne({ id: article.id }, {
          name,
          quantity,
          buyPrice
        }).then(record => {
          return res.json({ success: true, record})
        }).catch(err => {
          return res.status(400).json({ success: false, error: err})
        })
      } else return res.status(400).json({ success: false, error: "This record does not exist" });
    }).catch(err => res.json({ success: false, data: [], err }))
});

// deletes a record from our database
router.delete("/articles/:id", (req, res, next) => {
  const { id } = req.params
  const objectId = new mongoose.Types.ObjectId(id)

  Article
    .findByIdAndDelete(objectId).exec()
    .then((deleted) => {
      return res.json({ success: true, data: deleted })
    }).catch(err => {
      return res.status(400).json({ success: false, error: err})
    })
});

// deletes all records from our database
router.delete("/articles", (req, res, next) => {
  Article.deleteMany({}).then(data => {
    return res.status(200).json({ success: true, deleteCount: data.deletedCount})
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
  const { id } = req.params
  const objectId = new mongoose.Types.ObjectId(id)

  Sale
    .findById(objectId).exec()
    .then((sale) => res.json({ success: true, data: sale }))
    .catch(err => res.json({ success: false, data: [], err }))
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
      name,
      quantity,
      buyPrice,
      sellPrice,
      category
    } = req.body;

    let sale = new Sale({
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
  const { name, quantity, buyPrice, sellPrice } = req.body

  const { id } = req.params
  const objectId = new mongoose.Types.ObjectId(id)

  Sale
    .findById(objectId).exec()
    .then((sale) => {
      if (sale._id) {
        Sale.updateOne({ _id: objectId }, {
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
    }).catch(err => res.json({ success: false, data: [], err }))
});

router.delete("/sales/:id", (req, res, next) => {
  const { id } = req.params
  const objectId = new mongoose.Types.ObjectId(id)

  Sale
    .findByIdAndDelete(objectId).exec()
    .then((deleted) => {
      return res.json({ success: true, data: deleted })
    }).catch(err => {
      return res.status(400).json({ success: false, error: err})
    })
});

module.exports = router;
