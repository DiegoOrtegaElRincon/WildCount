import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Animals, Extinct, Home, Regions, User, Startup, Continents } from './pages'
import { Layout } from './components'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Startup />} />
        <Route path='/*' element={
          <Layout>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/extinct' element={<Extinct />} />
              <Route path='/continents' element={<Continents />} />
              <Route path='/regions' element={<Regions />} />
              <Route path='/regions/:continentId' element={<Regions />} />
              <Route path='/animals' element={<Animals />} />
              <Route path='/user' element={<User />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App