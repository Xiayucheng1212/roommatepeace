const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const roomModel = require('../model/rooms.js');

const router = express.Router();

router.use(express.json());

//GetRoomName
router.get('/getroomname', function (req, res, next) {
  const { room_id } = req.query;
  console.log(room_id);
  roomModel
    .getroomname(room_id)
    .then((room) => {
      res.json(room);
    })
    .catch(next);
});
// Create
router.post('/create', function (req, res, next) {
    roomModel
      .create(req.body)
      .then((room) => {
        res.json(room);
      })
      .catch(next);
  });
  
  // Update
  router.post(
    '/update',
    function (req, res, next) {
    roomModel
        .update(req.body)
        .then((room) => {
          res.json(room);
        })
        .catch(next);
    }
  );
  
  module.exports = router;