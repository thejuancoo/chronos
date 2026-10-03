import { Outlet } from "react-router"

export default function NavbarNotes() {
    let editando = false
    return (
        < >
            <header className="sticky top-0 z-50 h-8 flex 
                items-center justify-end 
                bg-white
                px-4"
            >
                <button
                    onClick={() => { }}
                    className="bg-blue-600 flex items-center text-white px-2 py-1 rounded-lg hover:bg-blue-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {editando ? "Actualizar" : "Guardar cambios"}
                </button>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}
