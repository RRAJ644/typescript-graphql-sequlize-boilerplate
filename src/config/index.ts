import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.join(__dirname, '../..', './.env'),
})

export * from './app'
