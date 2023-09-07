import Sequelize from 'sequelize'
import { sequelize } from '../db/database'
import User from './user'

const models: any = {
	User
}

try {
	sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.')
		})
		.catch(err => {
			console.log(err)
		})
} catch (error) {
	console.log('Unable to connect to the database:', error)
}

Object.keys(models).forEach(modelName => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models)
	}
})

models.Sequelize = Sequelize

export default models
