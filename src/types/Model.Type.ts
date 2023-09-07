import { Model } from 'sequelize'

import { User } from '../models/user'
import { sequelize } from '../db/database'

export interface IModel {
  sequelize: typeof sequelize
  User: Model<User> & typeof User & typeof Model
}

export interface IAuthenticatedRequest extends Request {
  user: User
}


