import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7001/api/login", {
                email,
                password,
            });

            const { token } = response.data; // Asegúrate de que tu backend envíe el token en esta propiedad
            localStorage.setItem("authToken", token); // Guarda el token en localStorage
            console.log("Login exitoso, token guardado:", token);

            navigate("/"); // Redirige a una página protegida, por ejemplo, un dashboard
        } catch (err) {
            console.error("Error durante el inicio de sesión:", err);
            setError("Credenciales inválidas. Por favor, intenta nuevamente.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="ejemplo@email.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="********"
                    />
                </div>
                <button type="submit">Ingresar</button>
                <div className="links">
                    <Link to="/auth/register">¿No tienes cuenta? Regístrate</Link>
                    <Link to="/auth/recovery">¿Olvidaste tu contraseña?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
