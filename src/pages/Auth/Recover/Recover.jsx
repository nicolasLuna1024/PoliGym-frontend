import React, { useState } from "react";
import axios from "axios";
import "./recover.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Realiza la solicitud al backend
            const response = await axios.post("http://localhost:7001/api/recovery", { email });

            // Mostrar un mensaje de confirmación basado en la respuesta del servidor
            setMessage("Si este correo está registrado, recibirás un enlace para restablecer tu contraseña.");
            setError("");
        } catch (err) {
            console.error("Error al solicitar la recuperación:", err);
            setError("Ocurrió un error al procesar la solicitud. Intenta nuevamente.");
            setMessage("");
        }
    };

    return (
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <h2>Recuperar Contraseña</h2>
                {message && <p className="success-message">{message}</p>}
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
