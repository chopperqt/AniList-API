const { Router } = require('express');
const router = Router();
const { authJwt, authLocal } = require('../auth/auth');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const user = new User({ ...req.body, role: 'user' });

    await user.save();
    
    return res.status(201).json({ user, message: 'You are successfully registered' });
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post('/login', authLocal, async (req, res, next) => {
  res.status(200).json(req.user);

  return next()
});
router.get('/profile', authJwt , async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user);

      next()
    }
  } catch (error) {
    res.status(404).json({error: 'Some problem'})
  }
})

module.exports = router;
