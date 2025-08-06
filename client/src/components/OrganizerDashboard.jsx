// import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./organizerdashboard.css";

function OrganizerDashboard() {
   const navigate = useNavigate();
  return (
    <div id="main-organizer-dash-container">

      <div id="orgz-dash-top-container">
        <div>
          <button className='btn-orgz-dash-top' onClick={()=>{navigate("/create/event")}} >Create New Event</button>
        </div>
        <div>
          <button className='btn-orgz-dash-top'>My Events</button>
        </div>
      </div>

      <div id="orgz-my-events">
        <div id="orgz-my-events-heading-container">
          <h1 id="my-events-heading">
            My Events

          </h1>

        </div>
        

      </div>
      
        
      

    </div>
  )
}

export default OrganizerDashboard;