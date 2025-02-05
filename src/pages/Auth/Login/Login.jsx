import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import AuthContext from "../../../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { setAuth, setToken, auth, token } = useContext(AuthContext)

    const handleChange = (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const url = `http://localhost:3000/api/auth/login`

            const respuesta = await axios.post(url, form, {withCredentials:true})

            setAuth(respuesta.data);
            setToken(respuesta.data.token)
            
            

            console.log("Auth: ", respuesta.data)
            console.log(respuesta.data.token)
            
            navigate("/cliente")
        } catch (error) {
            toast.error("Error al iniciar sesión")
            //console.log(error)
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
