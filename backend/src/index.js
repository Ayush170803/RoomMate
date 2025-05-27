import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({port: 8080});

let numberOfUsers = 0;
let allsockets = [];
let roomHistories = {};


wss.on("connection", (socket)=>
{
    // allsockets.push(socket);
    numberOfUsers = numberOfUsers+1;
    console.log("user have been connected, user No. "+numberOfUsers);

    socket.on("message",(message)=>
    {
        //converts to string
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type === "join")
        {
            allsockets.push({
                socket,
                room:parsedMessage.payload.roomId,
                username:parsedMessage.payload.username
            })
      
            if (!roomHistories[parsedMessage.payload.roomId]) {
                roomHistories[parsedMessage.payload.roomId] = [];
            }

            for (const msg of roomHistories[parsedMessage.payload.roomId]) {
                socket.send(JSON.stringify(msg));
            }
        }

        if(parsedMessage.type==="chat")
        {
        let currentUser=allsockets.find(s=>s.socket===socket);
        if(!currentUser) return;
        const {room,username}=currentUser;
            const chatMessage = {
                username,
                message: parsedMessage.payload.message,
            };

            if(!roomHistories[room])
            {
                roomHistories[room] = [];
            }
            roomHistories[room].push(chatMessage);
            if (roomHistories[room].length>50)
            {
                roomHistories[room].shift();
            }

        for(let user of allsockets)
        {
            if (user.room===room && user.socket!==socket)
            {
            user.socket.send(JSON.stringify({username,message: parsedMessage.payload.message}));
            }
        }
        }   
    })
    socket.on("close",()=>{
        allsockets=allsockets.filter(s=>s!==socket);
        numberOfUsers--;
        console.log("User disconnected. Remaining users: "+numberOfUsers);
    })


})