const dotenv = require('dotenv');
dotenv.config();
const favicon = require('serve-favicon');
const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser');
const { getGender } = require('gender-detection-from-name');
const UID = process.env.UID;
const firebaseConfig =  {"apiKey": process.env.apiKey,
"authDomain" : process.env.authDomain,
"projectId" : process.env.projectId,
"storageBucket" : process.env.storageBucket,
"messagingSenderId" : process.env.messagingSenderId,
"appId" : process.env.appId,
"measurementId" : process.env.measurementId,
"databaseURL" : process.env.databaseURL,
}

console.log(UID);
console.log(firebaseConfig);

// Returns a middleware to serve favicon
app.use(favicon(__dirname + '/favicon.ico'));

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
  
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
  
app.get('/', function(req, res){
    res.render('index')
})

app.get('/index', function(req, res){
    res.render('index')
})

app.get('/fire', function(req, res){
    res.send(firebaseConfig);
})

app.post('/verifyUid',urlencodedParser, function(req,res){
    if(req.body['name']!=UID) res.send("Yes")
    else res.send("No")
})

app.post('/getGender',jsonParser, function(req,res){
    const name = req.body['name'];
    const gen = getGender(name, 'hi');
    res.send(gen);
})

app.post('/editableIndex',urlencodedParser, function(req, res){
    if(req.body['name']!=UID) res.render('userError')
    else res.render('editableIndex')
})

app.get('/login', function(req, res){
    res.render('login')
})

app.post('/newUsers',urlencodedParser,function(req, res){
    if(req.body['id']!=UID) res.render('userError')
    else res.render('newUsers')
})

app.get('*', function(req, res){
    res.render('HTTP404')
})
  
app.listen(8080, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})