const express = require('express');
const authenticate = require('../middlewares/authenticate');
const User = require('../models/user');

// Define a new router
const router = new express.Router();

router.post('/users', async (req, res) => {
  console.log('[REQ]', req.body);
  const user = new User(req.body);

  try {
    await user.save();
    await user.generateAuthToken();
    res.redirect('/users/me');
  } catch (e) {
    console.log(e);
  }
});

// Route to log a user in
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    await user.generateAuthToken();

    res.redirect('/users/me');
  } catch (e) {
    console.log(e);
  }
});

// Route to log a user out
router.post('/logout', authenticate, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

// Route to a users profile
router.get('/users/me', (req, res) => {
  res.render('users');
});

// Route to update a user profile
router.patch('/users/me', async (req, res) => {
  try {
  } catch (e) {}
});

// Route to delete a user profile
router.delete('/users/me', async (req, res) => {
  try {
  } catch (e) {}
});

// Route to a users favorites list
router.get('/users/me/favorites', async (req, res) => {
  try {
  } catch (e) {}
});

// Route to update a users favorites list
router.patch('/users/me/favorites', async (req, res) => {
  try {
  } catch (e) {}
});

// Route to delete a users favorites list
router.delete('/users/me/favorites', async (req, res) => {
  try {
  } catch (e) {}
});

module.exports = router;
