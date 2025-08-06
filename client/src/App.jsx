import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import OrganizerDashboard from './components/OrganizerDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateEventForm from './components/CreateEventForm';

// import Login from "./components/Login";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div id="main-app-component">

      <Routes>

        <Route path="/login" element={<Login />} ></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

        <Route 
        path="/dashboard/orgevent" 
        element={<PrivateRoute>
          <OrganizerDashboard />
        </PrivateRoute>} />

        <Route 
        path="/create/event" 
        element={<PrivateRoute>
          <CreateEventForm/>
        </PrivateRoute>} />





        
      </Routes>
    </div>



  )
}

export default App
