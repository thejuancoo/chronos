import { Link } from "react-router"

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col fixed top-0 left-0 w-62.5 h-screen border border-gray-200 bg-white">
      <div className="h-14 flex items-center border-b border-gray-200">
        <Link
          to={"/"}
          className="tracking-tight font-bold text-2xl text-gray-900"
        >
          Chronos
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto bg-gray-100">
        <div>
        </div>
        </nav>
    </aside>
  )
}
