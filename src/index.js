// @flow

import App from './app'

async function start() {
  const app = App()
  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`${app.name}-${app.env}: app.listen(${port})`)
}

start()
