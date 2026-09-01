import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react"
import { useNavigate } from "react-router"
import useAuth from "../../../shared/hooks/useAuth"

export default function DialogSesion({openModal, setOpenModal}) {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

  return (
    <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        transition
        className="fixed overflow-auto inset-0 flex w-screen items-center justify-center bg-black/40 transition duration-300 ease-out data-closed:opacity-0"
    >
        <DialogPanel className="w-[90vw] max-w-lg rounded-lg sm:max-w-125 md:pt-6 bg-white py-2 px-6">
            <DialogTitle className="font-medium text-xl">¿Estas seguro de cerrar sesión?</DialogTitle>
            <Description className="text-gray-500">Se cerrará la sesión.</Description>
            <div className="flex justify-center py-6 space-x-4">
                <button 
                    className="py-1 px-4 border border-gray-200 font-medium rounded-lg hover:bg-gray-100"
                    onClick={() => setOpenModal(false)}
                >
                    Cancelar
                </button>
                <button 
                    className="py-1 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-500"
                    onClick={() => {
                        localStorage.removeItem("token")
                        setAuth({})
                        navigate('/')
                    }}
                >
                    Cerrar Sesion
                </button>
            </div>
        </DialogPanel>
    </Dialog>
  )
}
