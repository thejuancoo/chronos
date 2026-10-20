import { useEffect, useState} from "react"
import { useParams, Link, useNavigate } from "react-router"
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"
import { usePortfolios } from "../../shared/context/PortfolioContext"

export default function Portfolio() {
    const [portfoliosNotes, setPortfoliosNotes] = useState([])
    const {id_portfolio} = useParams()
    const { portfoliosAndNotes } = usePortfolios()
    const navigate = useNavigate()

    const fetchPortfolios = async () => {
        try {
            const result = await portfoliosAndNotes(id_portfolio)
            setPortfoliosNotes(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPortfolios()
    }, [])

    const portfolio = portfoliosNotes[0]
    
    return (
        <div className="flex-1 space-y-2 h-full p-4 md:p-4 pt-4">
            <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 hover:cursor-pointer"
                    >
                        <ArrowLeftIcon className="size-5"/>
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight">{portfolio?.title_portfolio}</h1>
                </div>
                <Link
                    className="flex bg-blue-600 text-white py-1 px-2 rounded-lg"
                    to={`/dashboard/notes/newNote`}
                >
                    <PlusIcon className="size-6 mr-1" />
                    Agregar Nota
                </Link>
            </div>

            {portfolio?.notes?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {portfolio.notes.map((note) => (
                        <div
                            key={note.notes_id}
                            className="rounded-lg border border-indigo-200/50 p-4 bg-linear-to-br from-indigo-100 via-indigo-50 to-purple-100"
                        >
                            <h2 className="text-xl font-medium line-clamp-1">
                                {note.title_note}
                            </h2>

                            <Link
                                to={`/dashboard/notes/${note.notes_id}`}
                                className="mt-2 block h-40 w-full overflow-hidden rounded-lg p-3 transition-colors duration-200 hover:bg-indigo-200"
                            >
                                <p className="line-clamp-6 text-gray-700">
                                    {note.content_note}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-gray-600 text-center p-8">Este portafolio no tiene notas.</p>
                </div>
            )}
        </div>
    )
}
