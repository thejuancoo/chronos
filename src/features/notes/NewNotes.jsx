import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { useNotes } from '../../shared/context/NoteContext'

export default function NewNotes() {
    const { addNote, isEditing } = useNotes()
    const navigate = useNavigate()

    const {
        register,
        reset,
        handleSubmit,
        formState : { errors }
    } = useForm()

    const onSubmit = async (dataNote) => {
        try {
            await addNote(dataNote)
            toast.success("Nota creada correctamente")
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {
            navigate("/dashboard/notes")
        }, 3000)
    }

    const getTodayDate = () => {
        const date = new Date()
        const options = {day: 'numeric', month: 'long', year: 'numeric'}
        return date.toLocaleDateString('es-ES', options)
    }

    return (
        <div className='p-8'>
            <form id="notes-form" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="flex my-4">
                    <CalendarIcon className="size-6 text-gray-500 mr-3"/>
                    <span className="text-gray-500">Creada: {getTodayDate()}</span>
                </div>
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
