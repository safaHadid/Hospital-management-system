import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Department from './pages/Department'
import Doctors from './pages/Doctors'

function App() {

  return (
    <>
    <Router>
    <Sidebar >
      <Routes>
        <Route path='/' element={<Department />} />
        <Route path='/doctors' element={<Doctors />} />
      </Routes>
    </Sidebar>
    </Router>
    </>
  )
}

export default App
