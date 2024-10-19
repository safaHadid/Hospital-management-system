import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Department from './pages/Department'
import Doctors from './pages/Doctors'
import Rooms from './pages/Rooms'

function App() {

  return (
    <>
    <Router>
    <Sidebar >
      <Routes>
        <Route path='/' element={<Department />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/rooms' element={<Rooms />} />

      </Routes>
    </Sidebar>
    </Router>
    </>
  )
}

export default App
