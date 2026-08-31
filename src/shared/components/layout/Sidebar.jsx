import { useState } from "react"
import { NavLink, Link } from "react-router"
import { 
  HomeIcon,
  CalendarIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline"

export default function Sidebar() {
  const classIcons = "size-5 mx-2 text-gray-700 dark:text-gray-200"
  const sidebarOptions = [
    {
      name: "Inicio",
      link: "",
      icon: <HomeIcon className={classIcons}/>,
      active: true
    },
    {
      name: "Calendario",
      link: "calendar",
      icon: <CalendarIcon className={classIcons}/>,
      active: true
    }
  ]


  return (
    <aside className="hidden md:flex flex-col fixed top-0 left-0 w-62.5 h-screen border border-gray-200 bg-white">
      <div className="h-14 flex items-center border-b border-gray-200">
        <Link
          to={"/dashboard"}
          className="tracking-tight font-bold text-2xl text-gray-900"
        >
          Chronos
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto bg-gray-100" >
        {
          sidebarOptions.filter(nav => nav.active != false).map(nav => (
            <NavLink
              to={`/dashboard/${nav.link}`} end
              key={nav.name}
              className={({ isActive }) =>
                `flex flex-row justify-start items-center px-2 py-1 cursor-pointer 
                                    ${isActive ? "bg-gray-200 dark:bg-gray-800 dark:text-white" : "hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}
            >
              {nav.icon}
              <p className="text-lg">{nav.name}</p>
            </NavLink>
          ))
        }
      </nav>

      <Link
        to={'/profile'}
        className="flex justify-between items-center border border-gray-200 p-2 rounded-lg hover:bg-gray-200"
      >
        <div>
          <h2 className="font-semibold">Juanco</h2>
          <p className="text-sm text-gray-600">correo2@correo.com</p>
        </div>
        <div>
          <ChevronRightIcon className="size-5"/>
        </div>
      </Link>
    </aside>
  )
}
