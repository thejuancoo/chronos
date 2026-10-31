import { Link } from "react-router";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function ConfirmAccount() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-1">
            <div className="w-full max-w-md border border-gray-300 p-6 rounded-xl">
                <div className="flex items-center justify-center">
                    <CheckIcon className="size-12 bg-green-100 mt-2 rounded-full p-2 text-green-600"/>
                </div>
                <h1 className="text-black tracking-tighter text-center font-bold text-2xl pt-8">
                    ¡Correo electrónico confirmado!
                </h1>
                <p className="text-gray-500 text-center mx-8 mt-2">
                    Hemos verificado tu identidad correctamente
                </p>
                <div className="border border-gray-200 p-4 rounded-lg mt-8">
                    <p className="text-gray-500 text-center">
                        Estado de la cuenta:
                    </p>
                    <p className="text-center text-xl font-semibold">
                        Tu cuenta ha sido verificada con éxito
                    </p>
                </div>
                <div className="space-y-2 mt-2 text-center">
                    <p className="text-sm text-gray-500">
                        ¡Felicidades! Ya puedes acceder a todas las funciones de tu cuenta de forma segura.
                    </p>
                </div>
                
                <div className="text-center mt-4">
                    Inicia Sesión{" "}
                    <Link to="/" className="text-blue-600 hover:underline">
                    Iniciar sesión
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
