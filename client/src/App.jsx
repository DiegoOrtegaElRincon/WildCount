import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Animals, Extinct, Home, Regions, User } from './pages'
import './App.css'

function App() {

  return (
    <Router>
      <div className='flex items-center justify-center h-[100vh]'>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>

      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/extinct' Component={Extinct} />
        <Route path='/regions' Component={Regions} />
        <Route path='/animals' Component={Animals} />
        <Route path='/user' Component={User} />
      </Routes>
    </Router>
  )
}

export default App
