import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db/database'
import { UserAttributes } from '../types/User.Type'

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number
  public firstName!: string
  public lastName!: string
  public email!: string
  public password!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}``

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    paranoid: true,
  }
)

export default User
