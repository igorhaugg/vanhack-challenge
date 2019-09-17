const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const validateRegister = require('../validation/register');
const validateLogin = require('../validation/login');
const User = require('../models/User');
const keys = require('../config/keys');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password, admin, active } = req.body;
  const { errors, validation } = validateRegister(req.body);

  // Check validation
  if (!validation) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'Este email já existe!';
      return res.status(400).json(errors);
    }

    const newUser = new User({
      name,
      email,
      password,
      admin,
      active
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        try {
          const user = await newUser.save();
          res.json(user);
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
});

// @route   POST api/users/login
// @desc    Login user / returning jwt token
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { errors, validation } = validateLogin(req.body);

  // Check validation
  if (!validation) {
    return res.json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found!';
      return res.json(errors);
    }

    if (!user.active) {
      errors.email = 'Inactive user, please talk with the system manager.';
      return res.json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, admin: user.admin };
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 * 24 }, (err, token) => {
          return res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        errors.password = 'Password invalid!';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, email, name } = req.user;
  res.json({ id, email, name });
});

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let id = req.params.id;

  try {
    const user = await User.findOneAndRemove({
      _id: id
    });
    if (!user) {
      errors.nouser = 'User not found!';
      return res.json(errors);
    }
    return res.json(user);
  } catch (error) {
    return res.status(400).json(errors);
  }
});

// @route   GET api/users
// @desc    Return users
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(404).json({ nousers: 'User not found!' });
  }
});

// @route   PATCH api/users/:id
// @desc    Edit user
// @access  Private
router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params.id;
  const admin = req.body.admin;
  const active = req.body.active;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        admin,
        active
      },
      { new: true }
    );
    if (!user) {
      errors.nouser = 'User not found!';
      return res.json(errors);
    }

    res.json(user);
  } catch (e) {
    res.status(400).json(errors);
  }
});

// @route   GET api/users/:id
// @desc    Get user
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let errors = {};
  let id = req.params.id;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      errors.nouser = 'User not found!';
      return res.json(errors);
    }
    const userFounded = {};
    userFounded.id = user.id;
    userFounded.email = user.email;
    userFounded.name = user.name;
    userFounded.admin = user.admin;
    userFounded.active = user.active;
    res.json(userFounded);
  } catch (e) {
    res.status(400).json(errors);
  }
});

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let id = req.params.id;

  try {
    const user = await User.findOneAndRemove({
      _id: id
    });
    if (!user) {
      errors.nouser = 'User not found!';
      return res.json(errors);
    }

    res.json(user);
  } catch (e) {
    res.status(400).json(errors);
  }
});

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', async (req, res) => {
  const errors = {};
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      errors.nousers = 'User not found!';
      return res.json(errors);
    }
    return res.json(users);
  } catch (err) {
    res.status(404).json({ nousers: 'User not found!' });
  }
});

module.exports = router;
