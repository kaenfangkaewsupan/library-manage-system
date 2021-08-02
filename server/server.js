const express = require('express');
const cors = require('cors');

const db = require('./models');
const loginRoute = require('./routes/loginRoute');
const librarianRoute = require('./routes/librarianRoute');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', loginRoute);
app.use('/librarian', librarianRoute);

db.sequelize.sync({ force: false }).then(() => {
	app.listen(port, () =>
		console.log(`Database is sync, Server is running at port ${port}`)
	);
});
