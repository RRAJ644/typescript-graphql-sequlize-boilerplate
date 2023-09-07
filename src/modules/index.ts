import * as path from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars'

const schemaArray = [...loadFilesSync(path.join(__dirname, './**/*.graphql')), ...scalarsTypeDefs]

const resolverArray = [...loadFilesSync(path.join(__dirname, './**/*.resolver.*')), scalarsResolvers]

export const typeDefs = mergeTypeDefs(schemaArray)

export const resolvers = mergeResolvers(resolverArray)

export const moduleMiddlewares = loadFilesSync(path.join(__dirname, './**/*.middleware.*'))

const schemaWithoutMiddleware = makeExecutableSchema({
	typeDefs,
	resolvers: { ...resolvers }
})

export default schemaWithoutMiddleware
