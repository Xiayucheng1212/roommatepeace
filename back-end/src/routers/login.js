const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const loginModel = require('../model/login.js');

const router = express.Router();

router.use(express.json());

// checklogin
router.get('/checklogin', function (req, res, next) {
    console.log(req.query);
	loginModel
      .checklogin(req.query)
      .then((user) => {
          res.json(user);
    })
    .catch(next);
});

module.exports = router;
