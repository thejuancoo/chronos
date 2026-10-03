import { useParams } from "react-router"
import { useNotes } from "../../shared/context/NoteContext"

export default function Note() {
    let { id } = useParams()
    const { notes } = useNotes()
    const noteSelected = notes.find(note => note.notes_id === Number(id))
   
    return (
        <div>
            <h2 className="font-medium text-3xl">{noteSelected?.title_note}</h2>
            <p className="mt-4">{noteSelected?.content_note}</p>
        </div>
    )
}
