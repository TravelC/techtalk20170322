//@flow

import History from '../history/model'

export default () => {
  return async (ctx: any, next: Function) => {
    await next()
    if (ctx.status != 200) {
      return
    }
    const { state: { person } } = ctx
    if (person) {
      await person.createHistory({
        path: `${ctx.method} ${ctx.path}`,
        body: JSON.stringify(ctx.request.body),
        host: ctx.header['host'],
        user_agent: ctx.header['user-agent']
      })
    }
  }
}
