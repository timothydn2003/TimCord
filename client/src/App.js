import './App.css';
import { useState } from 'react'
import { Chat } from './components/Chat';
import io from 'socket.io-client'

const socket = io.connect( "http://localhost:3001"||"https://timcord.herokuapp.com/")
const  App = () => {
  const[show,setShow] = useState(false)
  const[name,setName] = useState("")
  const[room,setRoom] = useState("");


  const showChat = () => {
    if(name!=="" && room !==""){
      setShow(true)
      socket.emit("join_room", room)
    }else{
      alert('Please fill in all fields!')
    }
  }
  const noShow = () => {
    setName("")
    setRoom("")
    setShow(false)
  }
  return (
    <div className="App">   
      {!show? 
           <div className='form'>
           <h2>TimCord</h2>
           <label>Username:</label>
           <input 
            onChange={(e) => setName(e.target.value)}
           />
           <label>Room:</label>
           <input onChange={(e) => setRoom(e.target.value)}/>
           <br></br>
            <button className='loginbtn' onClick={showChat}>Join</button>
          </div>
        :<Chat name = {name} room = {room} noShow = {noShow} socket = {socket}/>}
        <div className='footer'>
          <p>*Enter a username and join a room to start chatting*</p>
        </div>
    </div>
  );
}

export default App;
