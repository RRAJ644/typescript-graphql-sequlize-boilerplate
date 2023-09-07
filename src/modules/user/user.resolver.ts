require('dotenv').config({ path: './process.env' })
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { JWT_SECRET } from '../../config'
import { UserCreateInput, UserLoginInput } from '../../types'
import { IModel } from '../../types'
import { IAuthenticatedRequest } from '../../types/Model.Type'

const resolvers = {
	Query: {
		getUsers: async (parent: any, args: any, ctx: { models: IModel; req: Request }) => {
			try {
				const {
					models: { User }
				} = ctx
				const users = User.findAll()
				return users
			} catch (error: any) {
				return new Error(error)
			}
		},

		currentUser: async (parent: any, args: any, ctx: { models: IModel; req: IAuthenticatedRequest }) => {
			try {
				const {
					models: { User },
					req
				} = ctx
				return req.user
			} catch (error) {
				console.log(error)
			}
		}
	},
	Mutation: {
		createUser: async (_: any, args: { input: UserCreateInput }, ctx: { models: IModel; req: Request }) => {
			try {
				const {
					models: { User }
				} = ctx
				const { input } = args
				const where = { email: input?.email }

				const checkUser = await User.findOne({
					where
				})

				if (checkUser) {
					return new Error('Email already in use')
				}

				const createdUser = await User.create(input)

				return createdUser
			} catch (error: any) {
				return new Error(error)
			}
		},

		login: async (_: any, args: { input: UserLoginInput }, ctx: { models: IModel; req: Request }) => {
			try {
				const {
					models: { User }
				} = ctx
				const {
					input: { email, password }
				} = args

				const where = { email }
				const user: any = await User.findOne({ where })

				if (!user) {
					return new Error('Please sign up')
				}

				const confirmPassword = await bcrypt.compare(password, user?.password)

				if (!confirmPassword) {
					return new Error('Invalid Credentials')
				}

				const token = await jwt.sign({ user }, JWT_SECRET, {
					expiresIn: '1d'
				})
				return { token }
			} catch (error: any) {
				throw new Error(error)
			}
		}
	}
}

export default resolvers
