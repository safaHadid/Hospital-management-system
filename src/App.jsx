import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
    <Router>
    <Sidebar >
      <Routes>
        
      </Routes>
    </Sidebar>
    </Router>
    </>
  )
}

export default App
