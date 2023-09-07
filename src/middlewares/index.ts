import permissionMiddleware from './permission.middleware'
import authMiddleware from './auth.middleware'
import { moduleMiddlewares } from '../modules'

const middlewares = [
  authMiddleware,
  permissionMiddleware,
  ...moduleMiddlewares,
]

export default middlewares
