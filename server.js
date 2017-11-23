let express    = require('express');
let app        = express();
let bodyParser = require('body-parser');
let mongoose   = require('mongoose');
let path       = require('path');
let morgan     = require('morgan');
let multer     = require('multer');
let fs         = require("fs");
let router     = express.Router();

let port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
let bodyRoute  = require('./app/routes/api')(router);

app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname+ '/public'));
app.use('/api', bodyRoute);

mongoose.connect('mongodb://localhost:27017/hidonshabat', {useMongoClient: true}, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The Mongoose connection is ready');
    }
})

app.get('*', function(req, res){
    // res.sendFile(path.join(__dirname + '/public/views/index.html'));
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(port, function(){
    console.log('Server is ready... PORT ' +port);
});