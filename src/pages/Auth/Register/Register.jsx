import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}auth/register`
            const respuesta = await axios.post(url, {...formData});
        
            setFormData({
                username: "",
                name: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            
            toast.success(respuesta.data.msg);
        } catch (err) {
            toast.error("Error al registrarse");
        }
    };

    return (
        <div className="register-container">
            <ToastContainer/>
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Registro</h2>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Apellido:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="johndoe@email.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="*******"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="*******"
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
