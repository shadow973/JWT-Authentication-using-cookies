const User = require('../model/usermodel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const signup = req.body;
  if (!signup.email || !signup.password) {
    return res.status(400).json({ msg: 'Password and email are required' })
  }
  if (signup.password.length < 8) {
    return res.status(400).json({ msg: 'Password should be at least 8 characters length' })
  }

  if (signup.password !== signup.confPassword) {
    return res.status(400).json({ msg: 'Password and ConfPassword isnot equal' })
  }

  const user = await User.findOne({ email: signup.email })
  if (user) {
    return res.status(400).json({ msg: 'User already exists' })
  }

  const newUser = new User(signup)

  bcrypt.hash(signup.password, 7, async (err, hash) => {
    if (err) {
      return res.status(400).json({ msg: 'error while saving the password' })
    }

    newUser.password = hash
    try {
      const users = await newUser.save()
      res.status(201).json(users)
    } catch (error) {
      res.status(400).json({ msg: error.msg })
    }
  })

}

exports.login = async (req, res) => {
  const signup = req.body;

  if (!signup.email || !signup.password) {
    return res.status(400).json({ msg: 'Something missing' })
  }

  const user = await User.findOne({
    email: signup.email
  })

  if (!user) {
    return res.status(400).json({ msg: 'User not found' })
  }

  const matchPassword = await bcrypt.compare(signup.password, user.password)

  if (matchPassword) {
    try {
      const token = jwt.sign({ id: user._id, userEmail: user.email }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '24h' });
      res.status(202).json({token})
    } catch (error) {
      res.staus(400).json(error)
    }
  } else {
    res.status(400).json({ msg: 'Invalid crediential' })
  }

}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    res.json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}



