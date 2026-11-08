import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../shared/hooks/useAuth";

export default function ResetPassword() {
    const { recoveryPassword, errorUser, loading } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (dataEmail) => {
        try {
            const response = await recoveryPassword(dataEmail)
            console.log(response)
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-1">
            <div className="w-full max-w-sm border border-gray-300 p-6 rounded-xl">
                <h1 className="text-black font-semibold text-2xl">
                    Tu tiempo bajo control
                </h1>
                <h1 className="text-gray-400 text-2xl font-semibold ">
                    Recupera tu contraseña
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-12 mb-4">
                    <div className="space-y-2 mb-12 ">
                        <label className="font-semibold" htmlFor="password_user">
                            Nueva contraseña*
                        </label>
                        <input
                            type="password"
                            name="password_user"
                            className={`w-full p-2 rounded-lg border mt-2 focus:outline-none focus:ring-1 ${errors.password_user
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-200"
                                }`}
                            placeholder="Ingresa tu correo electrónico"
                            {...register("password_user", {
                                required: {
                                    value: true,
                                    message: "La contraseña es obligatorio",
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "El correo no es válido",
                                },
                            })}
                        />
                        {errors.password_user && (
                            <p role="alert" className="text-red-700 text-sm text-center">
                                {errors.password_user.message}
                            </p>
                        )}
                        {
                            <p role="alert" className="text-red-700 text-sm text-center">
                                {errorUser}
                            </p>
                        }
                    </div>
                    <button  
                        className={`bg-blue-700 text-white w-full mt-8 py-2 font-medium rounded-lg
                        ${loading
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Cargando" : "Continuar"}
                    </button>
                </form>
                <p className="text-sm m-2 mb-4 text-gray-500">
                    Te enviaremos un correo a tu cuenta de correo para restablecer tu
                    contraseña.
                </p>
                <div className="flex flex-row justify-center hover:underline">
                    <Link to="/">Volver a inicio</Link>
                </div>
            </div>
        </div>
    );
}
