import { useEffect } from "react"
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useTasks } from "../../../shared/context/TaskContext"

export default function DialogEditTask({ isDialogEditTaskOpen, setIsDialogEditTaskOpen, task }) {
    const { loading, updateTask } = useTasks()
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm()

    useEffect(() => {
        if(task){
            reset({
                title_task: task.title_task,
                description_task: task.description_task,
                date_task: task.date_task
            })
        }
    }, [task, reset])

    const onSubmit = async (dataTask) => {
        try {
            const data = await updateTask(task.id_task, dataTask)
            setIsDialogEditTaskOpen(false)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error("Ocurrio un error")
        }
    }

    return (
        <Dialog
            open={isDialogEditTaskOpen}
            onClose={() => setIsDialogEditTaskOpen(false)}
            transition
            className="fixed overflow-auto inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
        >
            <DialogPanel className="w-[90vw] max-w-lg rounded-lg sm:max-w-125 md:pt-6 bg-white py-2 px-6">
                <DialogTitle className="font-medium text-xl">Actualizar tarea</DialogTitle>
                <Description className="text-sm text-gray-500">Edita una tarea existente</Description>
                <div className="py-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
                        <div>
                            <label className="font-medium">Título</label>
                            <input
                                className="w-full border border-gray-200 p-2 rounded-md"
                                placeholder="Ej. Terminar el proyecto"
                                type="text"
                                name="title_task"
                                {...register("title_task", {
                                    required: {
                                        value: true,
                                        message: "El titulo es obligatorio"
                                    }
                                })}
                            />
                        </div>
                        {errors.title_task && (
                            <p role="alert" className="text-red-700 text-sm text-center">
                                {errors.title_task.message}
                            </p>
                        )}

                        <div>
                            <label className="font-medium">Descripcion</label>
                            <textarea
                                placeholder="Descripcion de la tarea"
                                className="p-2 w-full h-24 border border-gray-200"
                                name="description_task"
                                {...register("description_task")}
                            />
                        </div>

                        <div>
                              <label className="font-medium">Fecha</label>
                              <input
                                  className="w-full border border-gray-200 p-2 rounded-md"
                                  placeholder="Ej. Boda"
                                  type="date"
                                  name="date_task"
                                  {...register("date_task")}
                              />
                          </div>

                        <div className="flex justify-end mt-6 gap-2">
                            <button
                                className="border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-200 hover:cursor-pointer"
                                onClick={() => setIsDialogEditTaskOpen(false)}
                                type="button"
                            >
                                Cerrar
                            </button>
                            <button
                                className="border border-gray-200 rounded-lg px-3 text-gray-100 bg-blue-600 hover:cursor-pointer hover:bg-blue-700"
                                type="submit"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </div>
            </DialogPanel>
        </Dialog>
    )
}
