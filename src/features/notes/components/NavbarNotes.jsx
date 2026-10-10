import { Outlet, useParams } from "react-router"
import { CheckIcon } from "@heroicons/react/24/outline"

export default function NavbarNotes() {
    let { id } = useParams()

    return (
        < >
            <header className="sticky top-0 z-50 h-8 flex 
                items-center justify-end 
                bg-white
                px-4"
            >
                <button
                    form={id ? "editing-note" : "notes-form"}
                    className="bg-blue-600 flex items-center text-white px-2 py-1 rounded-lg hover:bg-blue-700"
                    type="submit"
                >
                    <CheckIcon className="size-5 mr-1"/>
                    {id ? "Guardar cambios" : "Crear nueva nota"}
                </button>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}
