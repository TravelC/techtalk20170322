//@flow

import App from '../src/app'
import request from 'supertest'
import http from 'http'

const app = (() => {
  const app = App()
  const server = http.createServer(app.callback())
  return request(server)
})()

global.app = app
