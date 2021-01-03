const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Task = mongoose.model('Model')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)
router.get('/',async(req,res)=>{
    try{
        const task = await Task.find({id:req.user._id})
        // console.log(task);
        return res.status(200).json({message:"Retrieved Successfully",task});
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({message:"Error in retrieving!"})
    }
});

router.post('/',async (req,res)=>{
    const {name} = req.body;
    const date = new Date();
    date.setMinutes(date.getMinutes()+30)
    date.setHours(date.getHours()+5)
    // console.log(name)
    // console.log(req.user._id)
    try{
        const task = new Task({id:req.user._id,name,timestamp:date});
        await task.save();

        return res.status(201).json({message:"Task Created successfully"})
    }catch(err){
        console.log(err.message)
        return res.status(400).json({message:"Error in creating!"})
    }
});

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const task = await Task.findById(id);
        if(!task){
            throw new Error("Item doesn't exist");
        }
        // console.log(task);
        return res.status(200).json({message:"Retrieved specific Successfully",task});
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({message:"Error in retrieving the specific task!"})
    }
})

router.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const date = new Date();
    date.setMinutes(date.getMinutes()+30)
    date.setHours(date.getHours()+5)

    try{
        const task = await Task.findByIdAndUpdate({_id:id},{$set:{name,timestamp:date}},{useFindAndModify:false,new:true});
        return res.status(202).json({data:task});
    }
    catch(err){
        console.log(err);
        return res.status(401).json({error:{message:err.message}});
    }
});

router.delete('/:id',async(req,res)=>{
    const {id} = req.params

    await Task.findByIdAndDelete({_id:id},(err,result)=>{
        if(err){
            console.log(err);
            return res.status(404).json({message:"Error in deleting"});
        }

        return res.status(202).json({data:result})
    })
})

module.exports = router;