
describe("router - people", () => {

  it('should return a message', async () => {
    const res = await app.get('/people')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.key('message')
    expect(res.body.message).to.equal('hello')
  })

})
