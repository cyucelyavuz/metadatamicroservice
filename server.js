var express = require('express');
var cors = require('cors');
require('dotenv').config()
var fs = require('fs');
var app = express();
const bodyparser = require('body-parser');
const multer  = require('multer');


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', multer().single('upfile'), (req,res)=>{
  const file = req.file;
  console.log(file);
  res.json({name:file.originalname, type:file.mimetype, size:file.size});
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
