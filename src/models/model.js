const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    name:{
        type:String,
        required:true
    },
    timestamp :{
        type: Date
    }
});

mongoose.model('Model',modelSchema);