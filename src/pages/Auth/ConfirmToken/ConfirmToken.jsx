import axios from "axios";
//import { urlencoded } from "express"; ..... -.- .....
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";

function ConfirmToken() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get("token");
    const userId = queryParams.get("userId");

    const [tokenBack, setTokenBack] = useState(false)

    const navigate = useNavigate()
    const [password, setPassword] = useState({})
    const [confirmPassword, setConfirmPassword] = useState({})

    const { register, handleSubmit, formState: { errors } } = useForm()

    const sendMail = async (data) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}auth/recovery-password`
        console.log(data)
        await axios.post(url, data)
        setTimeout(() => {
            navigate('/auth/login')
        }, 10000)
    }


    useEffect(()=> {
        const verifyToken = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}auth/recovery-password?token=${encodeURIComponent(token)}&userId=${encodeURIComponent(userId)}`
                await axios.get(url)
                setTokenBack(true)
                toast.success("Token verificado exitosamente")
            } catch (error) {
                toast.error("Error al verificar el token")
            }
        }
        verifyToken()
    }, [])
    

    return (
        <div>
            <ToastContainer/>
            {
                tokenBack && (
                    <form className="w-80" onSubmit={handleSubmit(sendMail)}>
                        <div className="mb-1">
                            <label className="mb-2 block text-sm font-semibold">
                                Nueva contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa tu nueva contraseña"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                {...register("password", { required: "La contraseña es obligatorio" })}
                            />
                            {errors.password && <p className="text-red-800">{errors.password.message}</p>}

                            <label className="mb-2 block text-sm font-semibold">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Repite tu contraseña"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                {...register("confirmPassword", { required: "La contraseña es obligatorio" })}
                            />
                            {errors.confirmPassword && <p className="text-red-800">{errors.confirmPassword.message}</p>}
                        </div>
                        <div className="mb-3">
                            <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                                Enviar
                            </button>
                        </div>
                    </form>
                )
            }

        </div>
    )
}

export default ConfirmToken