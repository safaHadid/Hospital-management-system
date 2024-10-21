import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Department from './pages/Department'
import Doctors from './pages/Doctors'
import Rooms from './pages/Rooms'
import Patients from './pages/Patients'
import Surgeries from './pages/Surgeries'

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
      </Routes>
    </Sidebar>
    </Router>
    </>
  )
}

export default App
