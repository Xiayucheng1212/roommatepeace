const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const notificationModel = require('../model/notifications.js');

const router = express.Router();

router.use(express.json());

// getroomnotifications                                      
router.get('/getroomnotification', function (req, res, next) {
  const { room_id } = req.query;
  notificationModel
    .getroomnotifications(room_id)
    .then((notifications) => {
      res.json(notifications);
    })
    .catch(next);
});

// Create
router.post('/create', function (req, res, next) {
    console.log(req.body);
	notificationModel
      .create(req.body)
      .then((user) => {
          res.json(user);
    })
    .catch(next);
});

module.exports = router;
