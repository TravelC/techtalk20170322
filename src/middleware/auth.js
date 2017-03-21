//@flow

import Boom from 'boom'
import _jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import Person from '../person/model'

const jwt = Promise.promisifyAll(_jwt)
const secret = process.env.AUTH_SECRET
const Bearer = /^Bearer (\S*)$/

export default async (ctx: any, next: Function) => {
  if (!secret) {
    throw Boom.unauthorized('Invalid secret')
  }
  if (!ctx.header || !ctx.header.authorization) {
    throw Boom.unauthorized('No authentication token found')
  }
  const m = Bearer.exec(ctx.header.authorization)
  if (!m || !m[1]) {
    throw Boom.unauthorized('Bad Authorization header format. Format is "Authorization: Bearer <token>"')
  }
  const token = m[1]
  try {
    const user = await jwt.verifyAsync(token, secret)
    const person = await Person.findById(user.id)
    if (!person) {
      throw Boom.unauthorized('Invalid token')
    }
    ctx.state = ctx.state || {}
    ctx.state.person = person
  } catch(err) {
    throw Boom.unauthorized('Invalid token')
  }
  await next()
}
