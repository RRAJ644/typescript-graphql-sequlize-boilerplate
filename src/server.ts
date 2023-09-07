import express from 'express'
import { createServer } from 'http'
import { applyMiddleware } from 'graphql-middleware'
import { ApolloServer } from 'apollo-server-express'
import models from './models/index'
import middlewares from './middlewares/index'
import schemaWithoutMiddleware from './modules/index'
import cors from 'cors'
import { sequelize } from './db/database'
import { PORT } from './config'

const port = PORT
;(async () => {
	const app = express()
	const httpServer = createServer(app)

	const schema = applyMiddleware(schemaWithoutMiddleware, ...middlewares)

	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			return { models, req }
		}
	})

	await server.start()
	app.use(
		'/graphql',
		cors({
			origin: true,
			credentials: true
		})
	)

	server.applyMiddleware({ app, cors: false })

	sequelize.sync({}).then(() => {
		httpServer.listen(port, () => {
			console.log(`🚀 Query endpoint ready at http://localhost:${port}/graphql`)
		})
	})
})()
