const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const loginModel = require('../model/login.js');

const router = express.Router();

router.use(express.json());

// checklogin
router.post('/checklogin', function (req, res, next) {
    // console.log(req.body);
	loginModel
      .checklogin(req.body)
      .then((user) => {
          res.json(user);
    })
    .catch(next);
});

module.exports = router;
