import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import useAuth from "../../shared/hooks/useAuth"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import DialogSesion from "./components/DialogSesion"

export default function Profile() {
  const [openModal, setOpenModal] = useState(false)
  const { auth, updateProfile, updatePassword } = useAuth()

  const { register, handleSubmit, reset } = useForm({
    values: auth
      ? {
          name_user: auth.name_user ?? "",
          lastname_user: auth.lastname_user ?? "",
          email_user: auth.email_user ?? "",
        }
      : undefined,
  })

  const onSubmit = async (data, event) => {
    try {
      const form = event.target
      if(form.id === "formUpdateProfileUser"){
        const response = await updateProfile({
          email_user: data.email_user,
          name_user: data.name_user,
          lastname_user: data.lastname_user
        })
        toast.success(response.message)
      } else {
        const response = await updatePassword({
          current_password: data.current_password,
          new_password: data.new_password
        })
        toast.success(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6 sm:px-6 lg:py-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Tu perfil</h1>
        <p className="font-normal text-gray-500">Gestiona los datos de tu cuenta</p>
      </div>

      <div className="mt-7 border border-gray-200 p-4 rounded-xl">
        <div>
          <h2 className="text-lg font-medium tracking-tight">Datos de la cuenta</h2>
          <p className="text-gray-500">Actualiza tu nombre y correo.</p>
          <form id="formUpdateProfileUser" onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <label className="font-medium">Nombre</label>
                <input 
                  id="name_user"
                  className="py-1 px-2 border border-gray-200 rounded-lg"
                  {...register("name_user")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-medium">Apellido</label>
                <input
                  id="lastname_user" 
                  className="py-1 px-2 border border-gray-200 rounded-lg"
                  {...register("lastname_user")}
                />
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <label className="font-medium">Correo electrónico</label>
              <input 
                id="email_user"
                className="py-1 px-2 border border-gray-200 rounded-lg"
                {...register("email_user")}
              />
            </div>

            <div className="flex justify-end pt-4 space-x-2">
              <button
                className="py-1 px-2 hover:bg-gray-200 rounded-lg font-semibold"
                type="button"
              >Cancelar</button>
              <button
                form="formUpdateProfileUser"
                className="bg-gray-900 text-white hover:bg-gray-800 font-semibold rounded-lg py-1 px-2"
                type="submit"
              >Guardar cambios</button>
            </div>
            
          </form>
        </div>
      </div>

      <div className="mt-4 border border-gray-200 p-4 rounded-xl">
        <h2 className="text-lg font-medium tracking-tight">Contraseña</h2>
        <p className="text-gray-500">Cambia tu contraseña cuando lo necesites.</p>
        <form id="formUpdatePassword" onSubmit={handleSubmit(onSubmit)} className="pt-8 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Escribe tu contraseña actual</label>
            <input 
              type="password"
              id="current_password"
              className="py-1 px-2 border border-gray-200 rounded-lg"
              {...register("current_password")}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Contraseña nueva</label>
              <input
                type="password"
                id="new_password"
                className="py-1 px-2 border border-gray-200 rounded-lg"
                {...register("new_password")}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Confirmar contraseña</label>
              <input
                type="password"
                id="new_password2" 
                className="py-1 px-2 border border-gray-200 rounded-lg"
                {...register("new_password2")}
              />
            </div>
          </div>
          <div className="flex justify-end pt-2 space-x-2">
            <button
              id="btnUpdatePassword"
              form="formUpdatePassword"
              className="bg-gray-900 text-white hover:bg-gray-800 font-semibold rounded-lg py-1 px-2"
              type="submit"
            >
              Actualizar contraseña
            </button>
          </div>
        </form>
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
