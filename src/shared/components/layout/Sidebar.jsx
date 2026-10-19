import { useState } from "react"
import { NavLink, Link } from "react-router"
import { 
  HomeIcon,
  CalendarIcon,
  ChevronRightIcon,
  BookOpenIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline"
import useAuth from "../../hooks/useAuth"

export default function Sidebar() {
  const {auth} = useAuth()
  
  const classIcons = "size-5 mx-2 text-gray-700 dark:text-gray-200"
  const sidebarOptions = [
    {
      name: "Inicio",
      link: "",
      icon: <HomeIcon className={classIcons}/>,
      active: false
    },
    {
      name: "Calendario",
      link: "calendar",
      icon: <CalendarIcon className={classIcons}/>,
      active: true
    },
    {
      name: "Notas",
      link: "notes",
      icon: <BookOpenIcon className={classIcons}/>,
      active: true
    },
    {
      name: "Tareas",
      link: "tasks",
      icon: <CheckCircleIcon className={classIcons}/>,
      active: true
    },
    {
      name: "Portafolios",
      link: "portfolios",
      icon: <CheckCircleIcon className={classIcons}/>,
      active: true
    }
  ]


  return (
    <aside className="hidden md:flex flex-col fixed top-0 left-0 w-62.5 h-screen bg-linear-to-b from-indigo-50 via-purple-50 to-pink-100 border-r border-gray-100">
      <div className="h-14 flex items-center border-b border-gray-200">
        <Link
          to={"/dashboard/calendar"}
          className="tracking-tight px-4 font-bold text-2xl text-gray-900"
        >
          Chronos
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto mt-4 space-y-1">
        {
          sidebarOptions.filter(nav => nav.active != false).map(nav => (
            <NavLink
              to={`/dashboard/${nav.link}`} end
              key={nav.name}
              className={({ isActive }) =>
                `flex flex-row justify-start items-center px-2 py-1 cursor-pointer mx-2 rounded-lg text-gray-700
                                    ${isActive ? "bg-white dark:bg-gray-800 dark:text-white text-gray-900" : "hover:bg-white dark:text-gray-300 dark:hover:bg-gray-800"}`}
            >
              {nav.icon}
              <p className="text-lg">{nav.name}</p>
            </NavLink>
          ))
        }
      </nav>

      <Link
        to={'/profile'}
        className="flex justify-between items-center border border-pink-200 p-2 rounded-lg hover:bg-pink-50"
      >
        <div>
          <h2 className="font-semibold">{`${auth.name_user} ${auth.lastname_user}`}</h2>
          <p className="text-sm text-gray-600">{auth.email_user}</p>
        </div>
        <div>
          <ChevronRightIcon className="size-5"/>
        </div>
      </Link>
    </aside>
  )
}
