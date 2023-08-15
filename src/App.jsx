import { Route, Routes } from 'react-router-dom'
import './App.css'
import Setting from './components/quiz/Settting'
import Quiz from './components/quiz/Quiz'
import Login from './components/login/Login'
import NotFound from './components/layout/NotFound'
import History from './components/history/History'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/quiz/history' element={<History/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
