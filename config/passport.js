const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');


module.exports = function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'emailid'
  }, (emailid, password, done) => {
    User.findOne({
      emailid: emailid
      })
      .then(user => {
        if (!user) {
          return done(null, false, {
            message: "No User Found"
          })
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Password Incorrect"
            })
          }
        })
      })
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
