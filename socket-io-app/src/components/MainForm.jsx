import React, { useState } from "react";
import {useNavigate} from "react-router-dom"


export default function MainForm() {
  const [data, SetData] = useState({ name: "", room: "" });
  const [error , setError] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    SetData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  
  const navigate = useNavigate()


  const validation = () =>{
    if(!data.name){
        setError("Please enter your name")
        return false
    }
    if(!data.room){
        setError("Please select your room")
        return false
  }
  setError("")
  return true
}


const handleSubmit = (e) =>{
e.preventDefault()
const isvalid = validation()
if(isvalid){
    navigate(`/chat/${data.room}` ,{state:data})
}
}

  return (
    <div>
      <div className="px-4 py-4 shadow bg-white  border rounded-row">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h2 className="text-success mb-4">Welcome to Chatipy</h2>
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control bg-light"
              name="name"
              value={data.name}
              placeholder="type your name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <select
              className="form-select bg-light"
              name="room"
              value={data.room}
              onChange={handleChange}
            >
              <option value="">Select Room</option>
              <option value="gaming">Gaming</option>
              <option value="coding">Coding</option>
              <option value="18+">18+</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 mb-2 font-weight-bold"
          >
            Submit
          </button>
            { error ? <small className="text-danger">{error}</small> : ""}
        </form>
      </div>
    </div>
  );
}
