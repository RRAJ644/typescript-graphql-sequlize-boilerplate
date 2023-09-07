import { shield, allow } from 'graphql-shield'

const permissions = shield({
	Query: {
		'*': allow,
		getUsers: allow
	},
	Mutation: {
		'*': allow,
		login: allow
	}
})

export default permissions
