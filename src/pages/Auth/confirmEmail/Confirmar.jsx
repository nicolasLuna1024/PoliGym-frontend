import "./Confirmar.css"

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function Confirmar() {
    
    const { token } = useParams();
    const [mensaje, setMensaje] = useState({})
    
    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/auth/confirm/${token}`
            await axios.get(url)
            toast.success("Email confirmado exitosamente")
        }
        catch(error)
        {
            toast.error("Error al confirmar correo electrónico")
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <div className="container">
            <ToastContainer/>
            <div className="content">
                <img className="imagenConfirmacion" src="" alt="" />
                <p className="mensajeConfirmacion">Muchas Gracias por confirmar su correo</p>
                <p className="mensajeConfirmacion">Ya puede iniciar sesión</p>
                <Link to="/auth/login" className="botonConfirmacion"> Iniciar Sesión </Link>
            </div>  
        </div>
    )
}

export default Confirmar;