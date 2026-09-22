import { useState } from "react"
import { 
    Dialog,
    DialogTitle,
    DialogPanel,
    Description
} from "@headlessui/react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import DialogAddEvent from "./DialogAddEvent"
import DialogEditEvent from "./DialogEditEvent"


export default function DialogShowEvent({isModalEventOpen, setIsModalEventOpen, selectedDay}) {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [isDialogAddEventOpen, setIsDialogAddEventOpen] = useState(false)
    const [isDialogEditEventOpen, setIsDialogEditEventOpen] = useState(false)

  return (  
    <>
        <Dialog
            open={isModalEventOpen}
            onClose={() => setIsModalEventOpen(false)}
            transition
            className="fixed overflow-auto py-8 inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
        >
            <DialogPanel className="w-[90vw] max-w-lg rounded-lg sm:max-w-125 md:pt-6 bg-white p-8">
                <div className="flex justify-between">
                    <DialogTitle className="font-medium text-xl">Eventos del dia</DialogTitle>
                    <button
                        className="p-1 rounded-full hover:bg-gray-100 hover:cursor-pointer"
                        onClick={() => setIsModalEventOpen(false)}
                    >
                        <XMarkIcon className="size-6"/>
                    </button>
                </div>
                {selectedDay?.events?.length > 0 ? (
                    selectedDay.events.map((event) => (
                        <button
                            key={event.id}
                            className="flex justify-between items-center w-full border border-gray-200 rounded-lg p-4 mt-2 hover:bg-gray-50"
                            onClick={() => {
                                setIsDialogEditEventOpen(true)
                                setIsModalEventOpen(false)
                                setSelectedEvent(event)
                            }}
                        >
                            <div className="flex flex-col items-start text-left">
                                <h2 className="font-semibold">{event.title_event}</h2>
                                <p>{event.description_event}</p>
                                <p>{event.date_event}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">{event.time_event}</p>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="text-center p-4 text-gray-600">
                        <p>No hay eventos disponibles</p>
                    </div>)
                }
                <button
                    className="flex justify-center items-center py-1 rounded-lg mt-3 text-center w-full border border-gray-200 hover:bg-gray-50"
                    onClick={() => {
                        setIsDialogAddEventOpen(true)
                        setIsModalEventOpen(false)
                    }}
                >
                    <PlusIcon className="size-4 mr-1"/>
                    Agregar nuevo evento este dia
                </button>
            </DialogPanel>
        </Dialog>

        <DialogAddEvent
            isDialogAddEventOpen={isDialogAddEventOpen}
            setIsDialogAddEventOpen={setIsDialogAddEventOpen}
        />

        <DialogEditEvent
            event={selectedEvent}
            isDialogEditEventOpen={isDialogEditEventOpen}
            setIsDialogEditEventOpen={setIsDialogEditEventOpen}
        />
    </>
  )
}
