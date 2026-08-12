import { useState } from "react"
import { 
    Dialog,
    DialogTitle,
    DialogPanel,
    Description
} from "@headlessui/react"

export default function DialogShowEvent({isModalEventOpen, setIsModalEventOpen}) {
  return (
    <Dialog
        open={isModalEventOpen}
        onClose={() => setIsModalEventOpen(false)}
        transition
        className="fixed overflow-auto py-8 inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
    >
        <DialogPanel className="max-w-lg bg-white p-8">
            <DialogTitle className="font-medium text-xl">Eventos del dia</DialogTitle>
        </DialogPanel>
    </Dialog>
  )
}
