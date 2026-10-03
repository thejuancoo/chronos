import {useState} from 'react'

export default function NewNotes() {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    
    const handleChange = e => {
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
        
        setText(e.target.value ?? '')
    }

    const getTodayDate = () => {
        const date = new Date()
        const options = {day: 'numeric', month: 'long', year: 'numeric'}
        return date.toLocaleDateString('es-ES', options)
    }

    return (
        <div className='p-8'>
            <input
                id='title_note'
                className='mb-4'
                type={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='Escribe un titulo'
                style={{
                    width: '90%',
                    resize: 'none',
                    overflow: 'hidden',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    border: 'none',
                    outline: 'none'
                }}
            />
            <div className="flex my-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <span className="text-gray-500">Creada: {getTodayDate()}</span>
            </div>
            <textarea
                id='content_note'
                className='border border-gray-200 mt-2'
                value={text}
                onChange={handleChange}
                placeholder='Escribe tus ideas...'
                rows={1}
                style={{
                    width: '90%',
                    resize: 'none',
                    overflow: 'hidden',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    border: 'none',
                    outline: 'none'
                }}
            />
        </div>
    )
}
