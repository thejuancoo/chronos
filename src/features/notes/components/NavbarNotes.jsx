import { useNavigate } from "react-router"
import { Outlet, useParams } from "react-router"
import { 
    CheckIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline"
import DropdownOptions from "./DropdownOptions"

export default function NavbarNotes() {
    let { id } = useParams()
    const navigate = useNavigate()

    return (
        < >
            <header className="sticky top-0 z-50 h-8 flex 
                items-center justify-between
                bg-white
                px-4"
            >
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 hover:cursor-pointer"
                >
                    <ArrowLeftIcon className="size-5"/>
                </button>
                <div className="flex space-x-2">
                    <DropdownOptions id={id}/>
                    <button
                        form={id ? "editing-note" : "notes-form"}
                        className="bg-blue-600 flex items-center text-white px-2 py-1 rounded-lg hover:bg-blue-700"
                        type="submit"
                    >
                        <CheckIcon className="size-5 mr-1"/>
                        {id ? "Guardar cambios" : "Crear nueva nota"}
                    </button>
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}
