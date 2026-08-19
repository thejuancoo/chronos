import { useState } from "react"
import { 
    Dialog,
    DialogTitle,
    DialogPanel,
    Description
} from "@headlessui/react"
import { PlusIcon } from "@heroicons/react/24/outline"

export default function DialogShowEvent({isModalEventOpen, setIsModalEventOpen, selectedDay, setSelectedDay}) {
    console.log(selectedDay)
  return (  
    <Dialog
        open={isModalEventOpen}
        onClose={() => setIsModalEventOpen(false)}
        transition
        className="fixed overflow-auto py-8 inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
    >
        <DialogPanel className="w-[90vw] max-w-lg rounded-lg sm:max-w-125 md:pt-6 bg-white p-8">
            <DialogTitle className="font-medium text-xl">Eventos del dia</DialogTitle>
            {selectedDay?.transactions?.length > 0 ? (
                selectedDay.transactions.map((event) => (
                    <button
                        key={event.id}
                        className="flex justify-between items-center w-full border border-gray-200 rounded-lg p-4 mt-2 hover:bg-gray-50"
                    >
                        <div className="">
                            <h2 className="font-semibold">{event.title}</h2>
                            <p>{event.description}</p>
                            <p>{event.date}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">{event.time}</p>
                        </div>
                    </button>
                ))
            ) : (
                <div className="text-center p-4">
                    <p>No hay eventos disponibles</p>
                </div>)
            }
            <button
                className="flex justify-center items-center py-1 rounded-lg mt-3 text-center w-full border border-gray-200 hover:bg-gray-50"
                onClick={() => {}}
            >
                <PlusIcon className="size-4 mr-1"/>
                Agregar nuevo evento este dia
            </button>
        </DialogPanel>
    </Dialog>
  )
}
