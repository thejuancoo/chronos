import { 
    Dialog,
    DialogPanel,
    DialogTitle,
    Description,
} from "@headlessui/react"
import {
  CalendarIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/16/solid'
import { useNotes } from "../../../shared/context/NoteContext"

export default function InfoNotes({ isDialogInfoOpen, setIsDialogInfoOpen, id }) {
    const { notes } = useNotes()
    const noteSelected = notes.find(note => note.notes_id === Number(id))
    console.log(noteSelected)

    return (
        <Dialog
            open={isDialogInfoOpen}
            onClose={() => setIsDialogInfoOpen(false)}
            transition
            className="fixed overflow-auto inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
        >
            <DialogPanel className="w-[90vw] max-w-lg rounded-lg sm:max-w-125 md:pt-6 bg-white py-2 px-6">
                <DialogTitle className="font-medium text-xl">{noteSelected?.title_note}</DialogTitle>
                <Description className="text-sm text-gray-500">Datos de la nota seleccionada</Description>
                <div className="mt-8 mb-4">
                    <div>
                        <h1>Identificación y relaciones</h1>
                        <span>Evento: {noteSelected?.id_event}</span>
                    </div>
                    <div className="pb-4">
                        <p className="font-semibold py-2">Fechas de registro</p>
                        <div className="border border-gray-200 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between">
                                <div className="flex flex-row items-center space-x-2">
                                    <CalendarIcon className="size-4 text-gray-500"/>
                                    <p className="text-gray-500">Fecha de creación: </p>
                                </div>
                                <p>{noteSelected?.createdAt}</p>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex flex-row items-center space-x-2">
                                    <CalendarIcon className="size-4 text-gray-500"/>
                                    <p className="text-gray-500">Última actualización: </p>
                                </div>
                                <p>{noteSelected?.updatedAt}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="flex items-center px-2 border border-gray-200 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsDialogInfoOpen(false)}
                    >
                        <XMarkIcon className="size-5 text-gray-800"/>
                        Cerrar
                    </button>
                </div>
                
            </DialogPanel>
        </Dialog>
    )
}
