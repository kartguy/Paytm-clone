import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { DashBoard } from "./pages/Dashboard"
import { Sendmoney } from "./pages/SendMoney"

function App() {

  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/send' element={<Sendmoney/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
