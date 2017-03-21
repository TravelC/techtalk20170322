
import Router from 'koa-router'
import Boom from 'boom'
import Person from './model'

const router = new Router({
  prefix: '/people'
})

router.get('/', async ctx => {
  const message = 'hello'
  ctx.body = { message }
})

router.post('/login', async ctx => {
  const { email, password } = ctx.request.body
  const person = await Person.unscoped().findOne({ where: { email } })
  if (person) {
    if (person.matchPassword(password)) {
      const token = person.generateToken()
      ctx.body = {
        token,
        person: person.toSafeJSON()
      }
    }
  }
})

export default router
