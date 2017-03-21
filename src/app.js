// @flow

import Koa from 'koa'
import body from 'koa-body'
import person from './person/router'
import { errors, track } from './middleware'

export default () => {
  const app = new Koa()
  app.name = 'techtalk(20170322)'
  app.use(body({ multipart: true }))
  app.use(track())
  app.use(errors())
  for (const router of [person]) {
    app.use(router.routes()).use(router.allowedMethods())
  }
  return app
}
