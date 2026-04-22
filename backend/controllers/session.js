const sessionRouter = require('express').Router()
const Session = require('../models/session')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer')) {
    console.log({token:authorization.replace('Bearer','').slice(1,)})
    return authorization.replace('Bearer','').slice(1,)
  }
  return null
}

sessionRouter.get('/',async (request, response) => {
    const sessions = await Session.find({}).populate('user', {
      username:1,name:1
    })
    response.status(201).json(sessions)
})

sessionRouter.get('/:id',async (request,response) => {
    const session = await Session.findById(request.params.id).populate('user',{
      username:1,name:1
    })

    if (session) {
      response.status(201).json(session)
    } else {
      response.status(404).end()
    }
})

sessionRouter.post('/',async (request,response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const session = new Session({
      name : request.body.name,
      speed : request.body.speed,
      rawspeed : request.body.rawspeed,
      accuracy : request.body.accuracy,
      lastActiveAt : Date().toString(),
      user : user._id
    })

    const savedSession = await session.save()
    user.sessions = user.sessions.concat(savedSession._id)
    await user.save()
    response.status(201).json(savedSession)
})

sessionRouter.put('/:id',async (request, response, next) => {
    const {name, speed, rawspeed, accuracy} = request.body

    Session.findById(request.params.id)
        .then(session => {
          if (!session) {
            return response.status(404).end()
          }
          session.name = name
          session.speed = speed
          session.rawspeed = rawspeed
          session.accuracy = accuracy
          
          return session.save().then(updatedSession => {
            response.json(updatedSession)
          })
        })
        .catch(error => next(error))
})

sessionRouter.delete('/:id',async (request,response) => {
    await Session.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = sessionRouter