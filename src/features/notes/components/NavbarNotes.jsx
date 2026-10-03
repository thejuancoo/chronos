import { Outlet } from "react-router"

export default function NavbarNotes() {
    return (
        < >
            <nav className="sticky top-0 z-50 h-14 flex items-center justify-between border-b border-gray-200 bg-white px-4">
                <div>

                </div>
                <div>
                    <button
                        onClick={() => { }}
                        className="hover:bg-red-100 hover:text-red-500 p-2 rounded-md border border-gray-200"
                    >Guardar cambios</button>
                </div>
            </nav>

            <main>
                <Outlet/>
            </main>
        </>
    )
}
