import { useEffect } from "react"
import { Link } from "react-router"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useNotes } from "../../shared/context/NoteContext"
import { toast } from "sonner"

export default function Notes() {
    const { notes, dropNote } = useNotes()

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
                    <div
                        key={note.notes_id}
                        className="rounded-lg border border-gray-200 p-4"
                    >
                        <div className="flex justify-between">
                            <h2 className="text-xl font-medium line-clamp-1">{note.title_note}</h2>

                            <button
                                onClick={ async () => {
                                    const response = await dropNote(note.notes_id)
                                    toast.success(response.message)
                                }}
                                className="rounded-full p-1 hover:bg-red-100 mr-1 hover:cursor-pointer"
                            >
                                <TrashIcon className="size-5 text-red-400" />
                            </button>
                        </div>

                        <Link
                            to={`/dashboard/notes/${note.notes_id}`}
                            className="mt-2 block h-40 w-full overflow-hidden rounded-lg p-3 transition-colors duration-200 hover:bg-gray-100"
                        >
                            <p className="line-clamp-6 text-gray-700">{note.content_note}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
