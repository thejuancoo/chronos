import { Route, Routes } from "react-router"
import Home from "./views/Home"
import Calendar from "./features/Calendar/Calendar"
import Dashboard from "./features/Dashboard/Dashboard"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/calendar" element={<Calendar/>}/>
      </Routes>
    </>
  )
}

export default App
