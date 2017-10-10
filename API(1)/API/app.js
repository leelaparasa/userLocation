var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8080;



var exphbs  = require('express-handlebars');



app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine','handlebars');


mongoose.connect('mongodb://leela:leela@ds113825.mlab.com:13825/codingtest');
mongoose.connection.on('connected',function(){
    console.log('Successfully connected to DataBase')
});
mongoose.connection.on('error',function(){
    console.log('Error in connecting to DataBase')
});


/*//app.use(express.static(__dirname+'/public'));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));
var Schema = mongoose.Schema,
    userSchema = new Schema({
        username : String,
        location : {
            address : String,
            latitude : String,
            longitude : String
        }
    });
var userModel = mongoose.model('users',userSchema);

/*app.get('/result',function (req,res) {
    userModel.find({},function(err,data){
        if(err){
            console.log(err);
        }res.render('show',{location:data.location.address});
    })
});*/
app.get('/',function(req,res){
    res.render('form');
});
app.post('/form',function (req,res) {
    userModel.create({username : req.body.username,
    location : {
        address : req.body.address,
        latitude : req.body.latitude,
        longitude : req.body.longitude
    }},function(err,data){
        if(err){
            console.log(err);
        }res.render('show',{location:data.location.address});
    })
});

app.listen(port,function(){
    console.log("Successfully connected to",port);
});