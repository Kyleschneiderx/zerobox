const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV)
const app = express();
const cors = require('cors');


const user = require('./routes/user')



mongoose.connect(config.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

app.use(cors());

// MIDDLEWARE
app.use(express.json({
    type: ['application/json', 'text/plain', 'application/x-www-form-urlencoded']
  }));
app.use(cookieParser());
app.use('/api/users', user);

app.use(express.static('client/build'));

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    })
}



const port = process.env.PORT || 3001

app.listen(port, () =>{
    console.log('SERVER RUNNING', port)
})