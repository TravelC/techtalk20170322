
import Router from 'koa-router'

const router = new Router({
  prefix: '/people'
})

router.get('/', async ctx => {
  const message = 'hello'
  ctx.body = { message }
})

export default router
