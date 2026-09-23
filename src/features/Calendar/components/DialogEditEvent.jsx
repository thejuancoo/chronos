import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { 
    Dialog,
    Description, 
    DialogPanel,
    DialogTitle
} from "@headlessui/react"
import { toast } from "sonner"
import { useEvents } from "../../../shared/context/EventContext"

export default function DialogEditEvent({event, isDialogEditEventOpen, setIsDialogEditEventOpen}) {
    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const { editEvent, dropEvent } = useEvents()

    useEffect(() => {
        if (event) {
            reset({
                title_event: event.title_event,
                description_event: event.description_event,
                date_event: event.date_event,
                time_event: event.time_event
            })
        }
    }, [event, reset])

    const onSubmit = async (data, e) => {
        const action = e.nativeEvent.submitter.value

        try {
            if(action === "edit"){
                await editEvent(event.id_event, data)
                const message = "Evento actualizado correctamente, refresca la pagina"
                toast.success(message)
            }

            if(action === "delete"){
                await dropEvent(event.id_event, event)
                const message = "Evento eliminado correctamente"
                toast.success(message)
            }

            setIsDialogEditEventOpen(false)
            reset()
        } catch (e) {
            const errorMessage = "Ocurrio un error"
            toast.error(errorMessage)
        }
    }

    return (
        <Dialog
            open={isDialogEditEventOpen}
            onClose={() => setIsDialogEditEventOpen(false)}
            transition
            className="fixed overflow-auto inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
        >
            <DialogPanel className="w-[90vw] max-w-lg rounded-lg sm:max-w-125 md:pt-6 bg-white py-2 px-6">
                <DialogTitle className="font-medium text-xl">Modifica un Evento</DialogTitle>
                <Description className="text-sm text-gray-500">Edita o elimina un evento o dia programado</Description>
                <div className="py-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-2">
                        <div>
                            <label className="font-medium">Título</label>
                            <input
                                className="w-full border border-gray-200 p-2 rounded-md"
                                placeholder="Ej. Boda"
                                type="text"
                                name="title_event"
                                {...register("title_event")}
                            />
                        </div>

                        <div>
                            <label className="font-medium">Descripcion</label>
                            <textarea
                                placeholder="Ej. Terminar de organizar"
                                className="p-2 w-full h-24 border border-gray-200"
                                name="description_event"
                                {...register("description_event")}
                            />
                        </div>

                        <div>
                            <label className="font-medium">Fecha</label>
                            <input
                                className="w-full border border-gray-200 p-2 rounded-md"
                                placeholder="Ej. Boda"
                                type="date"
                                name="date_event"
                                {...register("date_event")}
                            />
                        </div>

                        <div>
                            <label className="font-medium">Hora</label>
                            <input
                                className="w-full border border-gray-200 p-2 rounded-md"
                                placeholder="Ej. Boda"
                                type="time"
                                name="time_event"
                                {...register("time_event")}
                            />
                        </div>

                        <div className="flex justify-between mt-4 gap-2">
                            <button
                                id="btnDeleteEvent"
                                className="border-2 border-red-300 px-3 py-1 rounded-lg text-red-500 bg-red-100 hover:bg-red-200"
                                type="submit"
                                value="delete"
                            >
                                Eliminar
                            </button>
                            <div className="flex gap-3">
                                <button
                                    className="border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-200 hover:cursor-pointer"
                                    type="button"
                                    onClick={() => setIsDialogEditEventOpen(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    id="btnEditEvent"
                                    className="border border-gray-200 rounded-lg px-3 text-gray-100 bg-blue-600 hover:cursor-pointer hover:bg-blue-700"
                                    type="submit"
                                    value="edit"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogPanel>
        </Dialog>
    )
}
