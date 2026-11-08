import { useState } from "react"
import { Link, useNavigate} from "react-router"
import { 
    PlusIcon, 
    TrashIcon, 
    DocumentIcon, 
    ArrowRightIcon 
} from "@heroicons/react/24/outline"
import { usePortfolios } from "../../shared/context/PortfolioContext"
import { toast } from "sonner"
import DropdownOptions from "./components/DropdownOptions"
import DialogAddPortfolio from "./components/DialogAddPortfolio"

export default function Portfolios() {
    const { portfolios } = usePortfolios()
    const [isDialogAddPortfolioOpen, setIsDialogAddPortfolioOpen] = useState(false)
    const navigate = useNavigate()

    const formatDate = new Intl.DateTimeFormat('es-Es', {
        dateStyle: 'short'
    })

    return (
        <div className="flex-1 space-y-2 h-full p-4 md:p-4 pt-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Mis Portafolios</h1>
                <button
                    className="flex bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-800 hover:cursor-pointer"
                    onClick={() => setIsDialogAddPortfolioOpen(true)}
                >
                    <PlusIcon className="size-6 mr-1" />
                    Crear Portafolio
                </button>
            </div>

            {portfolios.length > 0 ?
                (
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        {portfolios.map((portfolio) => (
                            <div
                                key={portfolio.id_portfolio}
                                className="rounded-lg flex flex-col p-4 bg-gray-100 border border-gray-200"
                            >
                                <div className="flex justify-between items-center">
                                    <DocumentIcon className="size-16 text-gray-600"/>
                                    <DropdownOptions idPortfolio={portfolio.id_portfolio}/>
                                </div>
                                <Link
                                    className="flex justify-between items-center bg-white p-2 mt-1 rounded-lg hover:cursor-pointer hover:bg-gray-50"
                                    to={`/dashboard/portfolios/${portfolio.id_portfolio}/notes`}
                                >
                                   <div>
                                        <h2 className="text-xl font-medium pt-4 mx-2 text-start">{portfolio.title_portfolio}</h2>
                                        <p className="text-start mx-2 text-sm text-gray-600">Creado el {formatDate.format(new Date(portfolio.createdAt))}</p>
                                   </div>
                                   <div>
                                        <button
                                            onClick={() => navigate(1)}
                                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 hover:cursor-pointer"
                                        >
                                            <ArrowRightIcon className="size-5"/>
                                        </button>
                                   </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )
                : (<div className="pt-12">
                    <p className="text-xl text-gray-500 text-center">Crea un nuevo Portafolio para comenzar</p>
                </div>
                )
            }

            {/*Components*/}
            <DialogAddPortfolio
                isDialogAddPortfolioOpen={isDialogAddPortfolioOpen}
                setIsDialogAddPortfolioOpen={setIsDialogAddPortfolioOpen}
            />
        </div>
    )
}
