//mock database
let messages = [
    {
    id:1,
    user:"Karu",
    text:"welcome to chat application",
    timestamp: new Date().toISOString()
    },
    {
    id:2,
    user:"John",
    text:"Hello I am John!",
    timestamp: new Date().toISOString()
    }
];
//get all messages
const getMessages=(req,res)=>{
    try{
        res.json({
            success:true,
            count:messages.length,
            data:messages
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'Server Error',
            error:error.message
        })
    }
}

//post a new message
const createMessage=(req,res)=>{
    try{
        const{user,text}=req.body;
        //validation
        if(!user || !text){
            return res.status(400).json({
                success:false,
                message:'Provide user, text'
            })
        }
        const newMessage={
            id:messages.length+1,
            user,
            text,
            timestamp:new Date().toISOString()
        }
        messages.push(newMessage);
        res.status(201).json({
            success:true,
            message:'Message created successfully',
            data:newMessage
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'Server Error',
            error:error.message
        })
    }
}

//delete messages
const deleteMessage=(req,res)=>{
    try{
        messages=[];
        res.status(200).json({
            success:true,
            message:'All messages deleted successfully'
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'Server Error',
            error:error.message
        })
    }
}

//adding messages
const addMessage=(messageData)=>{
    const newMessage={
        id:messages.length+1,
        user:messageData.user,
        text:messageData.text,
        timestamp:new Date().toISOString()
    }
    console.log('New message added:',newMessage);
    messages.push(newMessage);
    return newMessage;
}

module.exports={getMessages,createMessage,deleteMessage,addMessage};