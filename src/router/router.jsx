import { Route, Routes } from "react-router"
import Home from "../views/Home"
import Calendar from "../features/Calendar/Calendar"
import Dashboard from "../features/Dashboard/Dashboard"
import DashboardLayout from "../shared/components/layout/DashboardLayout"
import Profile from "../features/profile/Profile"

import Notes from "../features/notes/Notes"
import NewNotes from "../features/notes/NewNotes"
import Note from "../features/notes/Note"
import NavbarNotes from "../features/notes/components/NavbarNotes"

import Tasks from "../features/tasks/Tasks"

import Portfolios from "../features/portfolios/Portfolios"
import Portfolio from "../features/portfolios/Portfolio"

import ProtectedRoute from "../shared/components/layout/ProtectedRoute"

import Login from "../features/auth/Pages/Login"
import Register from "../features/auth/Pages/Register"
import RecoveryPassword from "../features/auth/Pages/RecoveryPassword"
import ResetPassword from "../features/auth/Pages/ResetPassword"
import ConfirmEmail from "../features/auth/Pages/ConfirmEmail"
import ConfirmAccount from "../features/auth/Pages/ConfirmAccount"

function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Login/>}/>
      <Route path="/auth/signup" element={<Register/>}/>
      <Route path="/auth/forgot-password" element={<RecoveryPassword/>}/>
      <Route path="/auth/recovery-password/:token" element={<ResetPassword/>}/>
      <Route path="/auth/confirm-email" element={<ConfirmEmail/>}/>
      <Route path="/auth/confirm-account/:token" element={<ConfirmAccount/>}/>

      <Route element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/notes" element={<Notes/>}/>
          <Route path="/dashboard/tasks" element={<Tasks/>}/>
          <Route path="/dashboard/portfolios" element={<Portfolios/>}/>
          <Route path="/dashboard/portfolios/:id_portfolio/notes" element={<Portfolio/>}/>
          <Route element={< NavbarNotes/>}>
            <Route path="/dashboard/portfolios/:id_portfolio/notes/newNote" element={<NewNotes/>}/>
            <Route path="/dashboard/notes/newNote" element={<NewNotes/>}/>
            <Route path="/dashboard/notes/:id" element={<Note/>}/>
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Router
