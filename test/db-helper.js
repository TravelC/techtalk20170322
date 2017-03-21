import fixtures from 'sequelize-fixtures'
import Database from '../src/database'

beforeEach('db - fill with fixtures', async () => {
  await Database.getInstance().sync({ force: true })
  await fixtures.loadFile(`${__dirname}/fixtures.yml`, Database.getInstance().models, { log: () => {} })
})
