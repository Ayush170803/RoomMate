import React, { useRef, useState } from 'react';
import './index.css';

function App() {
  const [roomId,setRoomId] = useState('');
  const [username,setUsername] = useState('');
  const [connected,setConnected] = useState(false);
  const [message,setMessage] = useState('');
  const [chat,setChat] = useState([]);
  const socketRef = useRef(null);

  const connectToRoom =()=>
  {
  if(!username || !roomId) return alert("Username and Room ID are required");
    socketRef.current = new WebSocket('ws://localhost:8080');

    socketRef.current.onopen=()=> {socketRef.current.send(
      JSON.stringify({
          type:'join',
          payload:{roomId,username},
        })
      );
      setConnected(true);
    };

    socketRef.current.onmessage=(event)=>
    {
      const data=JSON.parse(event.data);
      setChat((prev)=>[...prev,{sender:data.username,text:data.message}]);
    };

    socketRef.current.onclose=()=>
    {
      setConnected(false);
      console.log('Disconnected from server');
    };
  };

  const sendMessage =()=> {
    if(message.trim()!=='')
      {
      socketRef.current.send(JSON.stringify({type:'chat',payload:{message},}));
      setChat((prev)=>[...prev,{sender: 'You',text: message}]);
      setMessage('');
    }
  };

  return(
    <div id="containerdiv">
        <div className="allballs">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
      <div className="chat-container">
        {!connected ? (<>
            <h2>Join a Chat Room</h2>
            <input type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" placeholder="Enter Room ID" value={roomId} onChange={(e)=>setRoomId(e.target.value)}/>
            <button onClick={connectToRoom}>Join</button>
          </>
        ):(
          <>
            <h3>Room: {roomId}</h3>
            <div className="chat-box">
              {chat.map((msg,idx)=>(
                <div key={idx} className={msg.sender === 'You'?'you' : 'stranger'}>
                  {msg.sender}: {msg.text}
                </div>
              ))}
            </div>
            <input type="text" placeholder="Type a message" value={message} onChange={(e)=>setMessage(e.target.value)} onKeyDown={(e) => {
                if(e.key==='Enter') sendMessage();
              }} />
            <button onClick={sendMessage}>Send</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
