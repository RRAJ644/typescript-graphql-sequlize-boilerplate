import bcrypt from 'bcryptjs'

export default {
  Mutation: {
    createUser: async (
      resolve: any,
      root: any,
      args: any,
      ctx: any,
      info: any
    ) => {
      try {
        if (args?.input?.password) {
          args.input.password = await bcrypt.hash(args.input.password, 10)
        }
        const result = await resolve(root, args, ctx, info)
        return result
      } catch (error: any) {
        return new Error(error)
      }
    },
  },
}
