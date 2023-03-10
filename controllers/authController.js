const express = require('express');

const router = express.Router();
const User = require('../models/users.model');
router.get('/', (req, res) => {
  // Check if user is logged in
  if (req.session.userId) {
    res.redirect('/events/list');
    return;
  }
  res.render('auth/login', {
    viewTitle: 'Welcome to Event Planner',
    user: {
      email: '',
      password: '',
    },
  });
});

router.get('/login', (req, res) => {
  res.render('auth/login', {
    viewTitle: 'Welcome to Event Planner',
    user: {
      email: '',
      password: '',
    },
  });
});

router.get('/signup', (req, res) => {
  res.render('auth/signup', {
    viewTitle: 'Welcome to Event Planner',
    user: {
      fullName: '',
      email: '',
      password: '',
    },
  });
});

router.post('/logout', (req, res) => {
  logout(req, res);
});

router.post('/login', (req, res) => {
  login(req, res);
});

router.post('/signup', (req, res) => {
  signUp(req, res);
});

function signUp(req, res) {
  const user = new User();
  user.fullName = req.body.fullName;
  user.password = req.body.password;
  user.email = req.body.email;
  user.role = 'user';
  user.save((err, doc) => {
    if (!err) {
      req.session.userId = doc._id;
      res.redirect('/');
      return;
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('auth/signup', {
          viewTitle: 'Insert users',
          user: req.body,
        });
      } else console.log('Error during account creation : ' + err);
    }
  });
}

async function login(req, res) {
  try {
    // We are searching for our user based on the email
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('User not found');
    }
    // 2. Compare password
    const isPasswordMatch = await user.comparePassword(req.body.password, user.password);
    // 3. Check if password matches
    if (!isPasswordMatch) {
      throw new Error('Password incorrect');
    }
    // 4. Generate token
    await user.generateAuthToken();
    user = user.toObject();
    req.session.userId = user._id;
    req.session.role = 'user';
    req.app.set('user', user)
    res.redirect('/events/list');
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function logout(req, res) {
  req.session.destroy();
  req.user = null;
  res.redirect('/');
}

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

module.exports = router;
