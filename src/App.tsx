import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginPage from './pages/Auth/LoginPage'
import Register from './pages/Auth/Register'
import DetailBook from './pages/DetailBook/DetailBook'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/detailbook' element={<DetailBook />} />
    </Routes>
  )
}

export default App
