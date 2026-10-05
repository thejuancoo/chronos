import { useParams } from "react-router"
import { useForm } from "react-hook-form"
import { useNotes } from "../../shared/context/NoteContext"

export default function Note() {
    let { id } = useParams()
    const { register } = useForm()
    const { notes } = useNotes()
    const noteSelected = notes.find(note => note.notes_id === Number(id))
   
    return (
        <div className='p-8'>
            <form id="editing-note">
                <input 
                    id='title_note'
                    className='mb-4 font-medium'
                    placeholder='Escribe un titulo'
                    value={noteSelected?.title_note}
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
                    value={noteSelected?.content_note}
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
