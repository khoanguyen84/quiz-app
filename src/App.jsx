import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Setting from './components/quiz/Settting'
import Quiz from './components/quiz/Quiz'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Setting />} />
        <Route path='/quiz' element={<Quiz/>}/>
      </Routes>
    </>
  )
}

export default App
