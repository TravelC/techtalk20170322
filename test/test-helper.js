import chai from "chai"
chai.config.includeStack = true
chai.should()
process.env.NODE_ENV = 'test'
process.env.AUTH_SECRET = 'secret'
global.expect = chai.expect
