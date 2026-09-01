import { Route, Routes } from "react-router"
import Home from "../views/Home"
import Calendar from "../features/Calendar/Calendar"
import Dashboard from "../features/Dashboard/Dashboard"
import DashboardLayout from "../shared/components/layout/DashboardLayout"
import Profile from "../features/profile/Profile"

import ProtectedRoute from "../shared/components/layout/ProtectedRoute"

import Login from "../features/auth/Pages/Login"
import Register from "../features/auth/Pages/Register"

function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Login/>}/>
      <Route path="/signin" element={<Register/>}/>

      <Route element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Router
