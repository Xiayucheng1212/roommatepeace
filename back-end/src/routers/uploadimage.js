const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const uploadImage = require('../model/uploadimage.js');

const router = express.Router();

router.use(express.json());

// getimage                                      
router.post('/', function (req, res) {
    let { user, file } = req.body;
    uploadImage
      .setImage(user, file);
});

module.exports = router;
