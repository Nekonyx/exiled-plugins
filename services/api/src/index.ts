import { TypeORM } from '@ex-plugins/db'

import { app } from './app'

const run = async () => {
  console.log('Connecting to the database...')
  await TypeORM.createConnection()

  console.log('done!')
}

run().catch((err) => {
  console.error(`📛 Can't start: ${err}`)
  setTimeout(() => process.exit(1), 2500)
})
