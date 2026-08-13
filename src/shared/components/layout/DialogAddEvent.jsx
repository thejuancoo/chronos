import { useState } from "react"
import { Dialog, Button, DialogPanel, DialogTitle } from "@headlessui/react"

export default function DialogAddEvent({isDialogAddEventOpen, setIsDialogAddEventOpen}) {
  return (
    <Dialog
      open={isDialogAddEventOpen}
      onClose={() => setIsDialogAddEventOpen(false)}
      transition
      className="fixed overflow-auto py-8 inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
    >
      <DialogPanel className="max-w-lg bg-white p-8">
        <DialogTitle>Agrega un nuevo evento</DialogTitle>
      </DialogPanel>
    </Dialog>
  )
}
