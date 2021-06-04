const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const userModel = require('../model/users.js');

const router = express.Router();

router.use(express.json());

// getsingleuser                                      
router.get('/getsingleuser', function (req, res, next) {
  const { id } = req.query;
  userModel
    .getsingleuser(id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});
// getroomusers                                    
router.get('/getroomusers', function (req, res, next) {
    const { room_id } = req.query;
    userModel
      .getroomusers(room_id)
      .then((users) => {
        res.json(users);
      })
      .catch(next);
  });

// Create
router.post('/user', function (req, res, next) {
  userModel
    .createuser(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

// Update
router.post(
  '/update',
  function (req, res, next) {
    userModel
      .updateuser(res.body)
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  }
);

module.exports = router;
