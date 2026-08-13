import { useState } from "react"
import { Dialog, Button, DialogPanel, DialogTitle, Description } from "@headlessui/react"
import { useForm } from "react-hook-form"
import { useEvents } from "../../context/EventContext"

export default function DialogAddEvent({isDialogAddEventOpen, setIsDialogAddEventOpen}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { error }
  } = useForm()

  const {addEvent} = useEvents()

  const onSubmit = async (data) => {
    try {
      await addEvent(data)
      reset()
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <Dialog
      open={isDialogAddEventOpen}
      onClose={() => setIsDialogAddEventOpen(false)}
      transition
      className="fixed overflow-auto py-8 inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
    >
      <DialogPanel className="w-[90vw] max-w-lg rounded-lg sm:max-w-125 md:pt-6 bg-white p-8">
        <DialogTitle className="font-medium text-xl">Nuevo Evento</DialogTitle>
        <Description className="text-sm text-gray-500">Agrega un nuevo o dia programado</Description>
        <div className="py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div>
              <label className="font-medium">Título</label>
              <input
                className="w-full border border-gray-200 p-2 rounded-md"
                placeholder="Ej. Boda"
                type="text" 
                name="title_event"
                {...register("title_event", {
                  required: {
                    value: true,
                    message: "El titulo es obligatorio"
                  }
                })}
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

            <div className="flex justify-end gap-2">
              <button
                className="border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-200 hover:cursor-pointer"
                onClick={() => {
                  setIsDialogAddEventOpen(false)
                  reset()
                }}
                type="button"
              >
                Cerrar
              </button>
              <button
                className="border border-gray-200 rounded-lg px-3 text-gray-100 bg-blue-600 hover:cursor-pointer hover:bg-blue-700"
                type="submit"
                onClick={() => { 
                  setIsDialogAddEventOpen(false)
                }}
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
