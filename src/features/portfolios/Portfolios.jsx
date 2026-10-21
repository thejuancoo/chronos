import { useState } from "react"
import { Link, useNavigate} from "react-router"
import { PlusIcon, TrashIcon, DocumentIcon } from "@heroicons/react/24/outline"
import { usePortfolios } from "../../shared/context/PortfolioContext"
import { toast } from "sonner"
import DropdownOptions from "./components/DropdownOptions"
import DialogAddPortfolio from "./components/DialogAddPortfolio"

export default function Portfolios() {
    const { portfolios, dropPortfolio } = usePortfolios()
    const [isDialogAddPortfolioOpen, setIsDialogAddPortfolioOpen] = useState(false)

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
                            <Link
                                key={portfolio.id_portfolio}
                                to={`/dashboard/portfolios/${portfolio.id_portfolio}/notes`}
                                className="rounded-lg p-4 bg-gray-100 border border-gray-200 hover:cursor-pointer"
                            >
                                <div className="flex justify-between items-center">
                                    <DocumentIcon className="size-16 text-gray-600"/>
                                    {/* <DropdownOptions/> */}
                                </div>
                                <h2 className="text-xl font-medium pt-4 mx-2 text-start">{portfolio.title_portfolio}</h2>
                                <p className="text-start mx-2 text-sm text-gray-600">Creado el {formatDate.format(new Date(portfolio.createdAt))}</p>
                            </Link>
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
