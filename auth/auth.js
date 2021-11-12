const passport = require('passport')
const LocalStorage = require('passport-local')
const { Strategy, ExtractJwt } = require('passport-jwt')
const config = require('config')
const User = require('../models/User')

const localOpts = {
  usernameField: 'email',
}

const localStrategy = new LocalStorage(localOpts, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })

    if (!user) return done(null, {error: "Email is not found"})
    if (!user.authenticateUser(password)) return done(null, {error: 'Email or password is invalid!'})

    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
})

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('secret'),
}

const jwtStrategy = new Strategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById({ _id: payload._id })

    if (!user) return done(null, false)
    
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
})

passport.use(localStrategy)
passport.use(jwtStrategy)

const authLocal = passport.authenticate('local', {session: false})
const authJwt = passport.authenticate('jwt', {session: false})

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(404).send('Хорошая попытка но нет')
}

module.exports = {
  authLocal,
  authJwt,
  isAdmin,
}