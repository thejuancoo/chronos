import { useEffect } from "react"
import { useNotes } from "../../shared/context/NoteContext"


export default function Notes() {
    const { notes } = useNotes()
    console.log(notes)
 
  return (
    <div className=''>
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Mi Notas</h1>
            <button>
                Agregar Nota
            </button>
        </div>
        <div>
            {notes.map((note, index) => (
                <div>
                    {note.title_note}
                    {note.content_note}
                </div>
            ))}
        </div>
    </div>
  )
}
