const express = require('express');
const mailer = require('express-mailer');
const bodyParser = require('body-parser')
const app = express();
const port = 80;

app.use (bodyParser.json())

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')



const auth = {
	user: 	"f24982456040a7",
	pass: "b0d356515e1766"
}

const options = {
	from: "esthermkitui@gmail.com",
	
	host: "smtp.mailtrap.io",
	port: 25,
	auth: auth,
	transportMethod: 'SMTP'
}

mailer.extend(app, options);
app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-Width, content-Type, Accept"
		);
	next();
});



app.post('/contacts', (req, res) => {
	// const message = "This is sample email";
	const recipient = {
		to: "891bc82395-98c07e@inbox.mailtrap.io",
		subject: req.body.subject,
		name: req.body.name,
		message: req.body.message
	}
    
	app.mailer.send('email', recipient, (error) => {
    console.log(error)
	});

	res.send('NodeJS Application')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));