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

function App() {

  return (
    <>
    <Router>
    <Sidebar >
      <Routes>
        <Route path='/' element={<Department />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/surgeries' element={<Surgeries />} />
        <Route path='/tests' element={<LabTests />} />
        <Route path='/radiographs' element={<Radiographs />} />
      </Routes>
    </Sidebar>
    </Router>
    </>
  )
}

export default App
