
const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser');
const UID = process.env.UID;
const apiKey =  process.env.apiKey;
const authDomain = process.env.authDomain;
const projectId = process.env.projectId;
const storageBucket = process.env.storageBucket;
const messagingSenderId = process.env.messagingSenderId;
const appId = process.env.appId;
const measurementId = process.env.measurementId;
const databaseURL = process.env.databaseURL;
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
  
app.listen(8080, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})