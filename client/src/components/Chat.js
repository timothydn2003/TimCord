import {useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import '../App.css'
export const Chat = (props) => {
    const[message,setMessage] = useState("")
    const[list,setList] = useState([])

    const sendMessage= async () => {
        if(message!== ""){
            const messageData = {
                room: props.room,
                name: props.name,
                message: message,
                time: new Date(Date.now()).getHours()+ ":" + new Date(Date.now()).getMinutes()
            }
            await props.socket.emit("send_message", messageData)
            setList((list) => [...list,messageData])
            setMessage("")
        }else{
            alert('Please type a message before sending.')
        }
    }

    useEffect(() => {
        props.socket.on("recieve_message" , (data) => {
            setList((list) => [...list,data])
        })
    }, [])
    return(
        <div className="chat">
            <div className='chatWindow'>
            <button className='logout' onClick={props.noShow}><b>Logout</b></button><br></br>
               <div className='chatHeader'>
                    <p>Live Chat for Room {props.room}</p>
               </div>
               <div className='chatBody'>
                    <ScrollToBottom className='messageContainer'>
                    {list.map((data) => {
                        return (
                            <div className='message'>
                                <div className='message-content'>
                                    <p id='message'>{data.message}</p>
                                </div>
                                <div className='message-info'>
                                    <p id="author"><b>{data.name}</b></p>
                                    <p id='time'>{data.time}</p>
                                </div>
                                <hr style={{color: "white", height: .5, backgroundColor: "white"}}/>
                            </div>
                        )
                    })}
                </ScrollToBottom>
               </div>
                   <div className='chatSend'>
                        <input className='messageInput' 
                        placeholder='Send a message...'
                        value = {message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress = {(event) => {
                            event.key === 'Enter' && sendMessage();
                        }}
                        />
                        <button className='sendMessagebtn' onClick={sendMessage}>Send</button>
                   </div>
                   <div className='footer'>
                        <p>*Messages will disappear once you leave the room*</p>
                   </div>
            </div>
        </div>
    )
}