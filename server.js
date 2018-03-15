var express =require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./app/routes/index');
var tasks = require('./app/routes/tasks');

var app = express();
var port =3000;

//view Engines 
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//set static Folder
app.use(express.static(path.join(__dirname,'clients')));

//body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port,function(){
    console.log('Server started on port: '+ port);
})