
describe("router - people", () => {

  it('should return a message', async () => {
    const res = await app.get('/people')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.key('message')
    expect(res.body.message).to.equal('hello')
  })

  describe('/login', () => {

    it('should login', async () => {
      let res = await app.post('/people/login').send({
        email: 'shengning@gmail.com',
        password: 'password'
      })
      expect(res.status).to.equal(200)
      expect(res.body).to.have.keys('person', 'token')
      expect(res.body.person.id).to.equal(1)
      expect(res.body.person.password).to.not.exist
      expect(res.body.person.salt).to.not.exist
      expect(res.body.person.hash).to.not.exist
    })

  })
})
