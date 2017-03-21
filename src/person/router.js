//@flow

import Router from 'koa-router'
import Boom from 'boom'
import Person from './model'
import { auth } from '../middleware'

const router = new Router({
  prefix: '/people'
})

router.get('/me', auth, async ctx => {
  const { person } = ctx.state
  ctx.body = { person: person.toSafeJSON() }
})

router.post('/login', async ctx => {
  const { email, password } = ctx.request.body
  if (!email || !password) {
    throw Boom.expectationFailed('require email and password', { email, password })
  }
  const person = await Person.unscoped().findOne({ where: { email } })
  if (person) {
    if (person.matchPassword(password)) {
      const token = person.generateToken()
      ctx.body = {
        token,
        person: person.toSafeJSON()
      }
    } else {
      throw Boom.forbidden('wrong password')
    }
  } else {
    throw Boom.notFound('user not found')
  }
})

export default router
