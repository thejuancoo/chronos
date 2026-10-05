import { useEffect } from "react"
import { Link } from "react-router"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useNotes } from "../../shared/context/NoteContext"


export default function Notes() {
    const { notes } = useNotes()

    return (
        <div className="flex-1 space-y-2 h-full p-4 md:p-4 pt-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Mi Notas</h1>
                <Link
                    className="flex bg-blue-600 text-white py-1 px-2 rounded-lg"
                    to={`/dashboard/notes/newNote`}
                >
                    <PlusIcon className="size-6 mr-1" />
                    Agregar Nota
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
                {notes.map((note) => (
                    <Link
                        key={note.notes_id}
                        to={`/dashboard/notes/${note.notes_id}`}
                        className="h-56 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 p-4"
                    >
                        <h2 className="text-xl font-medium">
                            {note.title_note}
                        </h2>

                        <p className="mt-2 line-clamp-6 text-gray-700">
                            {note.content_note}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
