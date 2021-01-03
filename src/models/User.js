const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save',function(next){
    const user = this;

    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err);

        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
});

userSchema.methods.comparePassword = function(password){
    const user = this;

    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password,(err,same)=>{
            if(err) return reject(false);
            if(!same){
                return reject(false);
            }
            return resolve(true);
        })
    })
}

mongoose.model('User',userSchema)
