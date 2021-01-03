require('./src/models/User')
require('./src/models/model')
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const body_parser = require("body-parser")
const port = 7000;
const authRoutes = require('./src/routes/authRoutes');
const requireAuth = require('./src/middlewares/requireAuth')
const taskRoutes = require('./src/routes/taskRoutes')

app.use(body_parser.json())
app.use('/',authRoutes)
app.use('/task',taskRoutes)

app.get('/',requireAuth,(req,res)=>{
    return res.json({"Message":"Hello World!"});
})

mongoose.connect("mongodb+srv://smk07:07072001@cluster0.smjiv.mongodb.net/<CTFtask>?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
});

mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB!")
});

mongoose.connection.on('error',()=>{
    console.log("Error in connecting too MongoDB!")
});

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})