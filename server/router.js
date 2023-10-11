const express = require('express');
const User = require('./UserModel');
const ObjectID = require('mongodb').ObjectId;
const cors = require('cors');
const router = new express();

router.use(cors());
router.options('*', cors());

router.post('/user-create', cors(), async (req, res) => {
  const candidate = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  res.send({ candidate });
});

router.get('/user-getall', async (req, res) => {
  const result = await User.find({});
  res.send({ users: result });
});

router.get('/user-get', async (req, res) => {
  const email = req.body.email;

  const result = await User.findOne({ email: email });
  res.send({ result });
});

// router.get(`/user-get/:id`, async (req, res) => {
//   userId = req.params.id;
//   console.log(userId);
//   const user = await User.findOne({ '_id.$oid': new ObjectID(userId) });
//   res.send({ user });
// });

module.exports = router;
