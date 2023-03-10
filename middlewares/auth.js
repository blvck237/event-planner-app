const Users = require('../models/users.model');

const userAuthMiddleware = async (req, res, next) => {
  const user = await Users.findById(req.session.userId);
  if (!user) {
    return res.redirect('/login');
  }
  req.user = user;
  next();
};

module.exports = { userAuthMiddleware };
