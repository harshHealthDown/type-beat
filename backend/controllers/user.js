const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { request } = require('express')
const jwt = require('jsonwebtoken')

usersRouter.get('/',async (request,response) => {
  const users = await User.find({}).populate('sessions',{
    name:1,speed:1,rawspeed:1,accuracy:1,lastActiveAt:1
  })
  response.json(users)
})

usersRouter.get('/:id',async (request,response) => {

  const user = await User.findById(request.params.id).populate('sessions',{
    name:1,speed:1,rawspeed:1,accuracy:1,lastActiveAt:1
  })
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/',async (request,response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    {
      expiresIn: 60*60
    }
  )

  response.status(201).json({token,username:savedUser.username,id:savedUser._id})
})

module.exports = usersRouter