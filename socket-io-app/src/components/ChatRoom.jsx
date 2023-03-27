import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Moment from "react-moment"
import { io } from "socket.io-client";

export default function ChatRoom() {
  const location = useLocation();
  const msgBoxRef = useRef()

  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [allmessage, setallMessage] = useState([]);
  const [socket , setSocket] = useState()


  useEffect(()=>{
    const socket = io("http://localhost:8000/");
    setSocket(socket)
    socket.on("connect", () => {
        socket.emit("joinRoom" , location.state.room)
      });
      
  },[])

  useEffect(() => {
    setData(location.state);
  }, [location]);

  
 useEffect(()=>{
    if(socket){
    socket.on("getlatestMessage" , (message) =>{
        setallMessage([...allmessage , message]) 
        msgBoxRef.current.scrollIntoView({behavior: "smooth"})
        setMsg("")
  })};
 },[socket , allmessage])



  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleEnter =(e)=>{
    e.keyCode === 13 ? onSubmit() : ""
  }

  const onSubmit = () => {
    if (msg){
    const message = { time: new Date(), msg, name: data.name };
    socket.emit("newMessage" , {message , room : data.room})
  
      
    }
      
  };
  


  return (
    // <div>
    <div className="py-4 m-5 w-50 shadow bg-white text-dark border rounded container">
      <div className="text-center px-3 mb-4 text-capitalize">
        <h1 className="text-success mb-3">{data?.room} Chat Room</h1>
      </div>
      <div
        className="bg-light border rounded p-3 mb-4"
        style={{ height: "400px", overflowY: "scroll" }}>
           

            {
               allmessage.map((msg)=>{
                return data.name === msg.name 
                ?
                <div className="row justify-content-end pl-5">
              <div className="d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto ">
                <div>
                  <strong className="m-1">{msg.name}</strong>
                  <small className="text-muted m-1">
                    <Moment fromNow>{msg.time}</Moment>
                  </small>
                </div>
                <h4 className="m-1">{msg.msg}</h4>
              </div>
            </div> :
            <div className="row justify-content-start">
              <div className="d-flex flex-column m-2 p-2 shadow bg-white border rounded w-auto">
                <div>
                  <strong className="m-1">{msg.name}</strong>
                  <small className="text-muted m-1">
                    <Moment fromNow>{msg.time}</Moment>
                  </small>
                </div>
                <h4 className="m-1">{msg.msg}</h4>
              </div>
            </div>
               })

            }
           <div ref={msgBoxRef}></div>

      </div>
      <div className="form-group d-flex">
        <input
          type="text"
          className="form-control bg-light"
          name="message"
          placeholder="type your message"
          value={msg}
          onChange={handleChange}
          onKeyDown={handleEnter}>
          </input>

          <button type="button" className="btn btn-success mx-2" onClick={onSubmit}>Send</button>
      </div>
    </div>
    // </div>
  );
}
