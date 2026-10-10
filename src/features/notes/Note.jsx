import { useParams, useNavigate} from "react-router"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useNotes } from "../../shared/context/NoteContext"

export default function Note() {
    let { id } = useParams()
    let navigate = useNavigate()
    const { notes, updateNoteById } = useNotes()
    const noteSelected = notes.find(note => note.notes_id === Number(id))

    const { register, handleSubmit } = useForm({
        values: {
            title_note: noteSelected?.title_note,
            content_note: noteSelected?.content_note
        }
    })

    const onSubmit = async (dataForm) => {
        const data = await updateNoteById(id, dataForm)
        toast.success(data.message)
        setTimeout(() => {
            navigate("/dashboard/notes")
        }, 1000) 
    }
   
    return (
        <div className="p-8">
            <form id="editing-note" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    id='title_note'
                    className='mb-4 font-medium'
                    placeholder='Escribe un titulo'
                    style={{
                        width: '90%',
                        resize: 'none',
                        overflow: 'hidden',
                        fontSize: '22px',
                        lineHeight: '1.5',
                        border: 'none',
                        outline: 'none'
                    }}
                    {...register("title_note")}
                />
                <textarea
                    id='content_note'
                    className='border border-gray-200 mt-2'
                    placeholder='Escribe tus ideas...'
                    rows={1}
                    style={{
                        width: '90%',
                        resize: 'none',
                        overflow: 'hidden',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        border: 'none',
                        outline: 'none',
                        fieldSizing: 'content'
                    }}
                    {...register("content_note")}
                />
            </form>
        </div>
    )
}
