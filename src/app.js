// @flow

import Koa from 'koa'
import person from './person/router'

export default () => {
  const app = new Koa()
  app.name = 'techtalk(20170322)'
  for (const router of [person]) {
    app.use(router.routes()).use(router.allowedMethods())
  }
  return app
}
