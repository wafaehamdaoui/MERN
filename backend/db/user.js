const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://hasnae:eidia2019@cluster0.oyrevzp.mongodb.net/?retryWrites=true&w=majority")
const User = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model