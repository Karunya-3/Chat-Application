const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const http=require('http');
const { Server } = require('socket.io');
const {addMessage}=require('./controllers/messageController');
const {Socket}=require('socket.io-client');     

const app=express();
const PORT=process.env.PORT || 5000;
//Load environment variables
dotenv.config();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST','DELETE']
    }
}); 


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//importing routes from server file
app.use('/api/messages',require('./routes/messageRoute')); 


//Root route
app.get('/',(req,res)=>{
    res.send({
        message:'Welcome to the Messaging API',
        timestamp:new Date(),
        endpoints:{
            getMessages:'/api/messages [GET]',
            postMessage:'/api/messages [POST]',
            deleteMessages:'/api/messages [DELETE]',
            testClient:'/index.html [GET]'
        },
        status:'success'
    });
});

//test route
/*app.get('/test',(req,res)=>{
    res.json({
        message: 'This is a test route',
        timestamp: new Date(),
        status: 'success'
    })
});*/

//socket connection in backend 
io.on('connection',(socket)=>{
    console.log('User socket id is:',socket.id);

    socket.emit('message',{
        user:"System",
        text:"Welcome to the chat",
        timestamp:new Date().toISOString()
    })
    socket.broadcast.emit('message',{
        user:"System",
        text:"A new user has joined the chat",
        timestamp:new Date().toISOString()
    });

    //disconnect by server
    socket.on('disconnect',()=>{
        console.log('User disconnected',socket.id);
        io.emit('message',{
            user:"System",
            text:"A user has left the chat",
            timestamp:new Date().toISOString()
        });
    })
    //typing in backend
    socket.on('typing',(data)=>{
        socket.broadcast.emit('userTyping',data.user);
    })
    //send and receive message
    socket.on('sendMessage',(data)=>{
        const newMessage=addMessage(data);
        io.emit('receiveMessage',newMessage);
    })

});

//Error handling middleware
app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:'Route not found'
    });
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        success:false,
        message:'Server Error',
        error:err.message
    });
})

server.listen(PORT,()=>{
    console.log(`Server is running at port:${PORT}`);
});