const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

const schema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    userName: {
        type: String,
        trim: true,
        unique: true,
    },
    avatar: {
        type: String, 
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        default: "user",
        trim: true,
    }
}, {
    timestamps: true
})


schema.pre('save',  function ( next ) {
    if (this.isModified('password')) {
      this.password = this._hashPassword(this.password);
    }
  
    return next();
});

schema.methods = {
    _hashPassword(password) {
        var salt = bcrypt.genSaltSync(config.get('salt'));

        return bcrypt.hashSync(password, salt)
    },
    authenticateUser(password) {
        return bcrypt.compareSync(password, this.password)
    },
    createToken() {
        return jwt.sign({ _id: this._id }, config.get('secret'))
    },
    toJSON() {
        return {
            _id: this._id,
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            avatar: this.avatar,
            role: this.role,
            token: this.createToken()
        }
    }
}





module.exports = model('User', schema)