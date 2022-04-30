const express = require("express");
var bodyParser = require("body-parser");
const Axios = require("axios");
var session = require('express-session')
var cors = require('cors')
const app =  express();






//Apti____________
const user = require("./routes/user");
const teacher = require("./routes/teacher");
const student = require("./routes/student");
const cookieParser = require("cookie-parser");
var path = require("path");
require('dotenv').config()


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser());

// trust first proxy
app.set('trust proxy', 1) 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use("/user", user);
app.use("/teacher", teacher);
app.use("/student", student);
//Apti End______________














const homeRoutes = require("./routes/homeRoutes");
const aptitudeRoutes = require("./routes/aptitudeRoutes");
const codingRoutes = require("./routes/codingRoutes");
const technicalRoutes = require("./routes/technicalRoutes");
const groupDiscussionRoutes = require("./routes/groupDiscussionRoutes");





const port = 3000;
//compiler code here_______________________Start________________-________
app.use(express.json());
app.post("/compile", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;

	if (language === "python") {
		language="py"
	}

	let data = ({
		"code": code,
		"language": language,
		"input": input
	});
	let config = {
		method: 'post',
		url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};
	//calling the code compilation API
	Axios(config)
		.then((response)=>{
			res.send(response.data)
			console.log(response.data)
		}).catch((error)=>{
			console.log(error);
		});
})
//compiler code here______________________End_________________-________


//Home routes
app.use(homeRoutes);

//aptitude routes
app.use(aptitudeRoutes);

//coding routes
app.use(codingRoutes);

//technical routes
app.use(technicalRoutes);

//group discussion routes
app.use(groupDiscussionRoutes);





app.listen(port,() => {
    console.log("Server running on port"+port);
});