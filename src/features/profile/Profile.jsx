import { useState } from "react"
import { useForm } from "react-hook-form"
import useAuth from "../../shared/hooks/useAuth"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import DialogSesion from "./components/DialogSesion"

export default function Profile() {
  const [openModal, setOpenModal] = useState(false)
  const { auth } = useAuth()
  console.log(auth)

  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm()

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6 sm:px-6 lg:py-10">
      <h1 className="text-4xl font-bold tracking-tight">Tu perfil</h1>

      <div className="mt-8 border border-gray-200 p-4 rounded-xl">
        <div>
          <h2 className="text-lg font-medium tracking-tight">Datos de la cuenta</h2>
          <p className="text-gray-500">Actualiza tu nombre, tu correo y tu foto de perfil</p>
          <form className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <label className="">Nombre</label>
                <input 
                  className="py-1 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Apellido</label>
                <input 
                  className="py-1 border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <label>Correo electrónico</label>
              <input 
                className="py-1 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="pt-4 space-x-2">
              <button
                className="py-1 px-2 hover:bg-gray-200 rounded-lg font-semibold"
              >Cancelar</button>
              <button
                className="bg-gray-900 text-white hover:bg-gray-800 font-semibold rounded-lg py-1 px-2"
              >Guardar cambios</button>
            </div>
            
          </form>
        </div>
      </div>

      <div className="mt-4 border border-gray-200 p-4 rounded-xl">
        <h2 className="text-lg font-medium tracking-tight">Contraseña</h2>
        <p className="text-gray-500">Cambia tu contraseña cuando lo necesites.</p>
      </div>

      <div className="mt-4 border border-gray-200 p-4 rounded-xl">
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium">Cerrar sesión</p>
            <p className="text-sm text-gray-500">
              Saldrás de tu cuenta en este dispositivo.
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)} 
            className="flex justify-center items-center border-gray-200 border py-1 px-2.5 hover:bg-gray-200 font-medium rounded-xl"
          >
            <ArrowRightStartOnRectangleIcon className="mr-1 size-5"/>
            Cerrar sesión
          </button>
        </div>
      </div>

      <DialogSesion
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  )
}
