import axios from "axios";
//import { urlencoded } from "express"; ..... -.- .....
import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

function Restablecer() {
    const [ params, setParams ] = useSearchParams()

    const [tokenBack, setTokenBack] = useState(false)

    const token = params.get("token");
    const userId = params.get("userId");

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/auth/recovery-password?token=${encodeURIComponent(token)}&userId=${encodeURIComponent(userId)}`
            await axios.get(url)
            setTokenBack(true)
            toast.success("Token verificado exitosamente")
        } catch (error) {
            toast.error("Error al verificar el token")
        }
    }

    return (
        <div>
            <h1> Recuperar contrasena </h1>
        </div>
    )
}

export default Restablecer