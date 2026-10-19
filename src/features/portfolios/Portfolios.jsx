import { Link } from "react-router"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { usePortfolios } from "../../shared/context/PortfolioContext"
import { toast } from "sonner"

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
                            <div
                                key={portfolio.id_portfolio}
                                className="rounded-lg border border-indigo-200/50 p-4 bg-linear-to-br from-indigo-100 via-indigo-50 to-purple-100"
                            >
                                <div className="flex justify-between">
                                    <h2 className="text-xl font-medium line-clamp-1">{portfolio.title_portfolio}</h2>

                                    <button
                                        onClick={async () => {
                                            const response = await dropPortfolio(portfolio.id_portfolio)
                                            toast.success(response.message)
                                        }}
                                        className="rounded-full p-1 hover:bg-red-100 mr-1 hover:cursor-pointer"
                                    >
                                        <TrashIcon className="size-5 text-red-400" />
                                    </button>
                                </div>

                                <Link
                                    to={`/dashboard/portfolio/${portfolio.id_portfolio}`}
                                    className="mt-2 block h-40 w-full overflow-hidden rounded-lg p-3 transition-colors duration-200 hover:bg-indigo-200"
                                >
                                    <p className="line-clamp-6 text-gray-700">{portfolio.description_portfolio}</p>
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
        </div>
    )
}
