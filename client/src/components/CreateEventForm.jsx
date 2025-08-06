// import React from 'react'
import "./createevent.css";

function CreateEventForm() {
  return (
    <div id="create-event-form-main-container">
      <form id="create-event-form">
        <input className="create-event-input-text" type="text" placeholder='Event Name' />
        <input className="create-event-input-text" type="text" placeholder='Event Date' />
        <input className="create-event-input-text" type="text" placeholder='Event Location' />
        <textarea className="create-event-input-textarea" placeholder="Description" ></textarea>
        <input type="submit"/>
      </form>

    </div>
  )
}

export default CreateEventForm;
