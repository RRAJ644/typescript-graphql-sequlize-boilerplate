import { allow, rule, shield } from 'graphql-shield'
import { AuthenticationError } from 'apollo-server-errors'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { UserAttributes } from '../types'


export function validateToken(authToken: string) {
  const token = authToken.slice(7, authToken.length)
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_SECRET,
      {},
      (err: any, decoded: UserAttributes | unknown) => {
        if (err) {
          reject(err)
        }
        return resolve(decoded)
      }
    )
  })
}

export const isAuthenticated = rule()(async (parent, args, ctx) => {
  try {
    const token = ctx.req.headers.authorization || ctx.req.headers.Authorization

    if (token) {
      if (!token.startsWith('Bearer ')) {
        return false
      }
      const userData: any = await validateToken(token)

      try {
        const user = await ctx.models.User.findOne({
          where: { id: userData.user.id },
        })

        if (!user) {
          return false
        }
        ctx.req.user = user

        return true
      } catch (err) {
        console.log(err)
        return false
      }
    } else {
      throw new AuthenticationError('Please Login')
    }
  } catch (e) {
    throw new AuthenticationError('Your session expired. Sign in again.')
  }
})

const permissions = shield({
  Query: {
    '*': isAuthenticated,
    getUsers: allow,
  },
  Mutation: {
    '*': isAuthenticated,
    createUser: allow,
    login: allow,
  },
})

export default permissions
