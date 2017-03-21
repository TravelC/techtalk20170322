//@flow

import Boom from 'boom'

export default () => {
  return async (ctx: any, next: Function) => {
    try {
      await next()
    } catch(error) {
      let boom
      if (error.errors) {
        const err = error.errors[0]
        if (err.type == 'unique violation') {
          boom = Boom.conflict(err.message, err)
        } else if (err.type == 'Validation error') {
          boom = Boom.expectationFailed(err.message, err)
        } else {
          boom = Boom.badData(err.message, err)
        }
      } else if (error.name == 'UnauthorizedError') {
        boom = Boom.unauthorized(error.message.trim())
      } else {
        boom = Boom.wrap(error)
      }
      if (boom.output.statusCode == 500) {
        console.trace(error)
      }
      ctx.status = boom.output.statusCode
      ctx.body = boom.output.payload
    }
  }
}
