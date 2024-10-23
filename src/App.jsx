import { Route, BrowserRouter as Router, Routes } from 'react-router-dom' 
import './App.css'
import Sidebar from './components/Sidebar'
import Department from './pages/Department'
import Doctors from './pages/Doctors'
import Rooms from './pages/Rooms'
import Patients from './pages/Patients'
import Surgeries from './pages/Surgeries'
import LabTests from './pages/LabTests'
import Radiographs from './pages/Radiographs'
import Login from './pages/Login'
import { useState } from 'react'

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <>
    <Router>
      {!isLoggedIn ? (
        <Routes>
          <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      ) : (
        <Sidebar setIsLoggedIn={setIsLoggedIn}>
          <Routes>
            <Route path='/' element={<Department/>} />
            <Route path='/rooms' element={<Rooms/>} />
            <Route path='/doctors' element={<Doctors/>} />
            <Route path='/patients' element={<Patients/>} />
            <Route path='/surgeries' element={<Surgeries/>} />
            <Route path='/tests' element={<LabTests/>} />
            <Route path='/radiographs' element={<Radiographs/>} />
          </Routes>
        </Sidebar>
      )}
    </Router>
    </>
  )
}

export default App;
