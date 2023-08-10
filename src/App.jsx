import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Setting from './components/quiz/Settting'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Setting />} />
      </Routes>
    </>
  )
}

export default App
