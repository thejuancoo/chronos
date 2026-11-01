import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useAuth from "../../../shared/hooks/useAuth";

export default function ConfirmAccount() {
    const [isValid, setIsValid] = useState(true)
    const { confirmAccount } = useAuth()
    const tokenJson = useParams()
    const token = parseInt(tokenJson.token, 10)

    const isValidToken = async () => {
        try {
            await confirmAccount(token)
            setIsValid(true)
        } catch (error) {
            if(error.message.includes('401') || error.message.includes('failed')){
                setIsValid(false)
            }
        }
    }

    useEffect(() => {
        isValidToken()
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-1">
            <div className="w-full max-w-md border border-gray-300 p-6 rounded-xl">
                <div className="flex items-center justify-center">
                    {isValid ? (<CheckIcon className="size-12 bg-green-100 mt-2 rounded-full p-2 text-green-600"/>) 
                        : (<XMarkIcon className="size-12 bg-red-100 mt-2 rounded-full p-2 text-red-600"/>)}
                </div>
                <h1 className="text-black tracking-tighter text-center font-bold text-2xl pt-8">
                    {isValid ? '' : 'Error al verificar tu correo'}
                </h1>
                <p className="text-gray-500 text-center mx-8 mt-2">
                    {isValid ? 'Hemos verificado tu identidad correctamente' : 'No pudimos confirmar tu correo electrónico'}
                </p>
                <div className="border border-gray-200 p-4 rounded-lg mt-8">
                    <p className="text-gray-500 text-center">
                        {isValid ? 'Estado de la cuenta: ' : 'Estado del enlace: '}
                    </p>
                    <p className="text-center text-xl font-semibold">
                        {isValid ? 'Tu cuenta ha sido verificada con éxito' : 'Expirado o no válido'}
                    </p>
                </div>
                <div className="space-y-2 mt-2 text-center">
                    <p className="text-sm text-gray-500">
                        {isValid ? '¡Felicidades! Ya puedes acceder a todas las funciones de tu cuenta de forma segura.' : 'El enlace de verificación puede haber caducado o ya fue utilizado anteriormente. Solicita uno nuevo para activar tu cuenta.'}
                    </p>
                </div>
                
                <div className="text-center mt-4">
                    {isValid ? 'Bienvenido: ' : 'Solicitar'}{" "}
                    <Link to="/" className="text-blue-600 hover:underline">
                    {isValid ? 'Ingresar' : 'Nuevo enlace'}
                    </Link>
                </div>
                <div className="text-center text-sm text-gray-500 my-2 mb-5">
                    ¿Tienes algún problema?{" "}
                    <Link to={"/home/support"} className="text-blue-700 hover:underline">
                    Contacta con soporte
                    </Link>
                </div>
            </div>
        </div>
    );
}
