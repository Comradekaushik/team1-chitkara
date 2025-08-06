// import React from 'react'
import "./createevent.css";
import { useState } from "react";

function CreateEventForm() {

  const [eventname, setEventName] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventdescription, setEventDescription] = useState("");

  const handleeventnamechange = (event) => {
        setEventName(event.target.value);
  };
  const handleeventdatechange = (event) => {
        setEventDate(event.target.value);
  };
  const handleeventLocationchange = (event) => {
        setEventLocation(event.target.value);
  };
  const handleeventdescriptionchange = (event) => {
         setEventDescription(event.target.value);
  };


  const handlesubmit = async (event) => {
        event.preventDefault();
      if (!eventname || !eventdate || !eventLocation || !eventdescription ) {
          alert("Fill in all the necessary inputs");
          return;
        }
        const formData = {
          eventName: eventname,
          location : eventLocation,
          description: eventdescription,
          userid: localStorage.getItem("userid"),


          
        };
        
        try {
          const response = await fetch("http://localhost:8000/event/createevent", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
    
          if (result.isPosted === "success") {
            alert("Post created sucessfully!");
          } else if (result.isPosted === "failure") {
            alert("Failed to create post!");
          } else {
            alert("something went wrong!");
          }
        } catch (error) {
          console.log(error);
        }
      };










  

  return (
    <div id="create-event-form-main-container">
      <form id="create-event-form">
        <input className="create-event-input-text" type="text" placeholder='Event Name' onChange={handleeventnamechange} />
        <input className="create-event-input-text" type="text" placeholder='Event Date' onChange={handleeventdatechange} />
        <input className="create-event-input-text" type="text" placeholder='Event Location' onChange={handleeventLocationchange} />
        <textarea className="create-event-input-textarea" placeholder="Description" onChange={handleeventdescriptionchange}></textarea>
        <input className="create-event-input-submit" type="submit"/>
      </form>

    </div>
  )
}

export default CreateEventForm;
