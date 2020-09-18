const router = require('express').Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./auth-module')



router.post('/register', (req, res) => {
  // implement registration
  const body = req.body
  const hash = bcryptjs.hashSync(body.password, 4)
  body.password = hash
  if (typeof body.username === "string" && typeof body.password === "string") {
    User.add(body)
  .then(user => {
    const token = makeJwt(user)
    res.status(201).json({data: user, token})
  })
  .catch(erorr => res.status(500).json({erorrMessage: erorr.message}))

  } else {
    res.status(400).json({ message: "please provide a username and password" })
  }
  
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;
        User.findBy({ username })
            .then(([user]) => {
                
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJwt(user);

                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
});


function makeJwt({ id, username}) {
  const payload = {
      username,
       id
  };
  const config = {
      jwtSecret: process.env.JWT_SECRET || "is it secret, is it safe?",
  };
  const options = {
      expiresIn: "8 hours",
  };

  return jwt.sign(payload, config.jwtSecret, options);
}

module.exports = router;
