import { Link } from "react-router"
import { PlusIcon, TrashIcon, DocumentIcon } from "@heroicons/react/24/outline"
import { usePortfolios } from "../../shared/context/PortfolioContext"
import { toast } from "sonner"
import DropdownOptions from "./components/DropdownOptions"

export default function Portfolios() {
    const { portfolios, dropPortfolio } = usePortfolios()

    return (
        <div className="flex-1 space-y-2 h-full p-4 md:p-4 pt-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Mis Portafolios</h1>
                <Link
                    className="flex bg-blue-600 text-white py-1 px-2 rounded-lg"
                    to={`/dashboard/portfolios`}
                >
                    <PlusIcon className="size-6 mr-1" />
                    Crear Portafolio
                </Link>
            </div>

            {portfolios.length > 0 ?
                (
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        {portfolios.map((portfolio) => (
                            <button
                                key={portfolio.id_portfolio}
                                className="rounded-lg p-4 bg-gray-100 border border-gray-200 hover:cursor-pointer"
                            >
                                <div className="flex justify-between items-center">
                                    <DocumentIcon className="size-16 text-gray-600"/>
                                    <DropdownOptions/>
                                </div>
                                <h2 className="text-xl font-medium pt-4 mx-2 text-start">{portfolio.title_portfolio}</h2>
                                <p className="text-start mx-2 text-sm text-gray-600">{portfolio.createdAt}</p>
                            </button>
                        ))}
                    </div>
                )
                : (<div className="pt-12">
                    <p className="text-xl text-gray-500 text-center">Crea un nuevo Portafolio para comenzar</p>
                </div>
                )
            }
        </div>
    )
}
