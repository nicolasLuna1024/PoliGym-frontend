import React, { useState } from "react";
import axios from "axios";
import "./recover.css";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}auth/recovery-password-mailing`

            await axios.post(url, email)

            toast.success("Correo de restauración enviado")
        } catch (error) {
            toast.error("Error al enviar el correo de restauración")
        }
    }

    return (
        <div className="forgot-password-container">
            <ToastContainer/>
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <h2>Recuperar Contraseña</h2>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email.email}
                        onChange={(e) => setEmail({email: e.target.value})}
                        required
                        placeholder="ejemplo@email.com"
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
