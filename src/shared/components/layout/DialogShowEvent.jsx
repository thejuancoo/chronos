import { useState } from "react"
import { 
    Dialog,
    DialogTitle,
    DialogPanel,
    Description
} from "@headlessui/react"

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
                        <div key={event.id}>
                            <h2 className="font-semibold">{event.title}</h2>
                            <p>{event.description}</p>
                            <p>{event.date}</p>
                            <p>{event.time}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-4">
                        <p>No hay eventos disponibles</p>
                    </div>)
                }
          </DialogPanel>
      </Dialog>
  )
}
