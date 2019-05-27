const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//load User model
const User = require('../../models/User');

//@route GET api/users/test
//@desc Tests users route
//@access Public
router.get('/test', (req, res) => res.json({
    msg: 'Users Works'
}));


//@route GET api/users/test
//@desc Register user
//@access Public

//sends in form and performs logic check
router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);


    //check validation
    if (!isValid) {
        return res.status(400).json(errors);

    }
    //checks if a user already registered with that email
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                //fetch the avatar, if it exists
                const avatar = gravatar.url(req.body.email, {
                    S: '200', //size
                    r: 'pg', //rating
                    d: 'mn' //default
                })

                //creates new User
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                //generates a salt with bcrypt and hash the password with the salt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user)).catch(err => console.log(err));
                    })
                })
            }
        })
});

//@route GET api/users/login
//@desc Login User / Returnning JWT Token
//@access Public

router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);


    //check validation
    if (!isValid) {
        return res.status(400).json(errors);

    }

    const email = req.body.email;
    const password = req.body.password;

    //checking if email being uded to login exits in the database
    User.findOne({
        email
    }).then(user => {
        if (!user) {
            errors.email = 'User not found'
            return res.status(404).json(errors)
        }

        //comparing password put during login against the one used during registration
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //if user is matched, payload(holds the user info inn this case) is what we want to include in the token
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }

                //sign token i.e jwt returns a token that is unique to this particualr payload, when the user tries to logunn
                jwt.sign(payload, keys.secretOrKey, {
                    expiresIn: 3600 //3600- an hour
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token //the Bearer token is a certaian type of protocol, we add it to be able to use the token
                    });
                });
            } else {
                errors.password = 'Password Incorrect';
                return res.status(400).json({
                    errors
                });
            };
        });
    });
});


//@route GET api/users/test/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;