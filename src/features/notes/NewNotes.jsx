import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { useNotes } from '../../shared/context/NoteContext'
import { usePortfolios } from '../../shared/context/PortfolioContext'

export default function NewNotes() {
    const { addNote } = useNotes()
    const navigate = useNavigate()
    const { id_portfolio } = useParams()
    const { addNoteInPortfolio } = usePortfolios()

    const {
        register,
        reset,
        handleSubmit,
        formState : { errors }
    } = useForm()

    const onSubmit = async (dataNote) => {
        try {
            if(id_portfolio){
                const result = await addNoteInPortfolio(id_portfolio, dataNote)
                toast.success(result.message)

                setTimeout(() => {
                    navigate(-1)
                }, 1000)
            } else {
                await addNote(dataNote)
                toast.success("Nota creada correctamente")
                
                setTimeout(() => {
                    navigate("/dashboard/notes")
                }, 1000)
            }
        } catch (error) {
            console.log(error)
            toast.error("Hubo un error, inténtalo después")
        }
    }

    const getTodayDate = () => {
        const date = new Date()
        const options = {day: 'numeric', month: 'long', year: 'numeric'}
        return date.toLocaleDateString('es-ES', options)
    }

    return (
        <div className='py-8 md:px-30 lg:px-42'>
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
                    {...register("title_note", {
                        required: {
                            message: "El titulo es obligatorio",
                            value: true,
                        }
                    })}
                />
                {errors.title_note && (
                    <p role='alert' className='text-red-700 text-sm text-center'>
                        {errors.title_note.message}
                    </p>
                )}
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
