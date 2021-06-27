const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const complainModel = require('../model/complains.js');

const router = express.Router();

router.use(express.json());

// getcomplains                                      
router.get('/getcomplain', function (req, res, next) {
  const { to_user } = req.query;
  complainModel
    .getcomplains(to_user)
    .then((complains) => {
      res.json(complains);
    })
    .catch(next);
});

// Create
router.post('/create', function (req, res, next) {
    //console.log(req.body);
	complainModel
      .create(req.body)
      .then((complain) => {
          res.json(complain);
    })
    .catch(next);
});
//delete
router.post('/delete', function (req, res, next) {
    const {id,userID} =req.body
    console.log(res.body);
	complainModel
      .deletecomplains(id,userID)
      .then((complain) => {
          res.json(complain);
    })
    .catch(next);
});
module.exports = router;
