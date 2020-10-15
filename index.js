const express = require('express');
const crud = require('./crud');

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    next();
  });

app.use(express.json());
app.use('/api',crud);
app.get('/',()=>{
    res.send('Heroku app started');
})
app.use(err=>{
    console.log('Server error');
})

app.listen(4100,()=>{
    console.log("Open");
});

