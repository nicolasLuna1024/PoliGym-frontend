import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import AuthContext from "../../../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { setAuth } = useContext(AuthContext)

    const handleChange = (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`

            const respuesta = await axios.post(url, {...form})

            setAuth(respuesta.data);
            toast.success("Inicio de sesión satisfactorio")
        } catch (error) {
            toast.error("Error al iniciar sesión")
        }
    }

    return (
        <div className="login-container">
            <ToastContainer/>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="ejemplo@email.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
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
