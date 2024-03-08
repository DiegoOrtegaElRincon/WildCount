import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Animals, Extinct, Home, Regions, User, Startup } from './pages'
import './App.css'

function App() {

  return (
    <Router> 
      <Routes>
        <Route path='/' Component={Startup} />
        <Route path='/home' Component={Home} />
        <Route path='/extinct' Component={Extinct} />
        <Route path='/regions' Component={Regions} />
        <Route path='/animals' Component={Animals} />
        <Route path='/user' Component={User} />
      </Routes>
    </Router>
  )
}

export default App
