const express = require("express")
const router = express.Router()
const Subscriber = require("../model/subscriber")

//get all data
router.get("/",async (req,res)=>{
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }catch(e){
        res.status(500).json({message:e.message})
    }
   

})

//get a speficic data
router.get("/:id", getSubscriber, (req,res)=>{
    res.json(res.subscriber)
})

// creating a field in the data
router.post("/", async(req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)

    }catch(e){
        res.status(400).json({message: e.message})
    }

})

//updating a field in the data
router.patch("/:id", getSubscriber, async (req,res)=>{
    if(req.body.name !== null){
        res.subscriber.name = req.body.name
    } 
    if(req.body.subscribedToChannel !== null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (e) {
        res.status(400).json({message: e.mesaage})
    }

}) 

// deleting a field in the data
router.delete("/:id", getSubscriber, async (req,res)=>{
    try{
        await res.subscriber.remove()
        res.json({mesaage: "deleted"})
    }catch(e){
        res.status(500).json({mesaage: e.message})
    }

})


//miiddleware for routes with id

async function getSubscriber(req,res,next){
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message: "Cannot find subscriber"})
        }
    }catch(e){
        res.status(500).json({message: e.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router 