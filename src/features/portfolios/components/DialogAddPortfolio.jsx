import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function DialogAddPortfolio({ isDialogAddPortfolioOpen, setIsDialogAddPortfolioOpen }) {

    const {
        handleSubmit,
        formState: {errors},
        reset,
        register
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
    }

    return (
        <Dialog
            open={isDialogAddPortfolioOpen}
            onClose={() => setIsDialogAddPortfolioOpen(false)}
            transition
            className="fixed overflow-auto inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
        >
            <DialogPanel className="w-[90vw] max-w-lg rounded-lg sm:max-w-125 md:pt-6 bg-white py-2 px-6">
                <DialogTitle className="font-medium text-xl">Nuevo Portafolio</DialogTitle>
                <Description className="text-sm text-gray-500">Crea un nuevo portafolio</Description>
                <div className="py-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
                        <div>
                            <label className="font-medium">Título</label>
                            <input
                                className="w-full border border-gray-200 p-2 rounded-md"
                                placeholder="Ej. Terminar el proyecto"
                                type="text"
                                name="title_portfolio"
                                {...register("title_portfolio", {
                                    required: {
                                        value: true,
                                        message: "El titulo es obligatorio"
                                    }
                                })}
                            />
                        </div>
                        {errors.title_portfolio && (
                            <p role="alert" className="text-red-700 text-sm text-center">
                                {errors.title_portfolio.message}
                            </p>
                        )}

                        <div>
                            <label className="font-medium">Descripcion</label>
                            <textarea
                                placeholder="Descripcion de la tarea"
                                className="p-2 w-full h-24 border border-gray-200"
                                name="description_portfolio"
                                {...register("description_portfolio")}
                            />
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                className="border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-200 hover:cursor-pointer"
                                onClick={() => {
                                    setIsDialogAddPortfolioOpen(false)
                                    reset()
                                }}
                                type="button"
                            >
                                Cerrar
                            </button>
                            <button
                                className="border border-gray-200 rounded-lg px-3 text-gray-100 bg-blue-600 hover:cursor-pointer hover:bg-blue-700"
                                type="submit"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </DialogPanel>
        </Dialog>
    )
}
