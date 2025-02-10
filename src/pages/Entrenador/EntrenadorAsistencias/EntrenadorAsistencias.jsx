import React, { useState, useEffect, useContext } from "react";
import {
    FaTrash,
    FaArrowLeft,
    FaArrowRight,
    FaUserPlus,
    FaEye
} from "react-icons/fa";


import "./estilos.css"
import { DiVim } from "react-icons/di";
import { BiColor } from "react-icons/bi";
import AuthContext from "../../../contexts/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const baseFormState = {
    username: "",
    date: "",
    checkIn: "",
    checkOut: ""
}


const EntrenadorAsistencias = () => {
    const { auth, token } = useContext(AuthContext)
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
    const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(null)

    console.log("token: ", token, "auth: ", auth)

    //Para el post, put y delete
    const [form, setForm] = useState({
        username: "",
        date: "",
        checkIn: "",
        checkOut: ""
    })

    //Para los get
    const [users, setUsers] = useState([])
    const [asistencias, setAsistencias] = useState([])
    
    //Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 6













    {
        /* Modal de listado */
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = (usernameSelected) => {
        const usuario = users.find(user => user.username === usernameSelected);
        if (!usuario) return;
        setUsuarioSeleccionado(usuario)
        setIsModalOpen(true)
        setForm({username: usernameSelected})
        console.log("isModalOpen: ", isModalOpen, usuario)
    }
    const closeModal = () => {
        setIsModalOpen(false)
        setForm(baseFormState)
        setUsuarioSeleccionado({})
    }

    {
        /* Modal de agregado */
    }
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)
    const openModalAdd = () => {
        setIsModalOpenAdd(true)
        setForm({_id: usuarioSeleccionado._id})
    }
    const closeModalAdd = () => {
        setIsModalOpenAdd(false)
        setForm(baseFormState)
        setUsuarioSeleccionado({})
    }

    {
        /* Modal de eliminación */
    }
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const openModalDelete = (asistenciaId) => {
        setIsModalOpenDelete(true);
    };
    
    
    const closeModalDelete = () => {
        setIsModalOpenDelete(false)
        setUsuarioSeleccionado({})
    }

    {
        /* Modal de eliminación anidado */
    }
    const [isModalOpenNest, setIsModalOpenNest] = useState(false)

    const openModalNest = () => setIsModalOpenNest(true)
    
    const closeModalNest = () => setIsModalOpenNest(false)

    











    const handleChange = async (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleAttendanceList = async () => {
        try
        {
            const url = `${import.meta.env.VITE_BACKEND_URL}asistencias/buscar/${form.username}`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            console.log(respuesta)
            setAsistencias(respuesta.data);
        }
        catch (error)
        {

        }
    };

    const handleSubmitPost = async (e) => {
        //Para crear un usuario se debe enviar:
        // username, name, lastname, email, password y role
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}users`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url, form, options)
            setForm(baseFormState)
            toast.success("Usuario creado exitosamente")
            setIsModalOpen(false)
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        } catch (error) {
            toast.error("Error al crear un usuario")
        }
    }

    const handleDelete = async (e) => {
        //console.log("Usuariooooooooooo: ", usuarioSeleccionado)
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}users/${usuarioSeleccionado}`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            await axios.delete(url, options)
            closeModalDelete()
            closeModalNest()
            toast.success("Usuario eliminado exitosamente")
            
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        } catch (error) {
            toast.error("Error al eliminar el usuario")
        }
    };
    














    useEffect(() => {
        const fetchUsers = async () => {
            try
            {
                const url = `${import.meta.env.VITE_BACKEND_URL}users`
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                console.log(respuesta)
                setUsers(respuesta.data);
            }
            catch (error)
            {

            }
            
        };

        fetchUsers();
    }, []);

    // logica de paginacion
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = Array.isArray(users) ? users.slice(indexOfFirstRow, indexOfLastRow) : [];
    console.log("CurrentRows: ", currentRows)

    const totalPages = Math.ceil(users.length / rowsPerPage);












    return (
        <div className="user-management-container">
            <ToastContainer/>
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-text">
                    <h1>Gestión de asistencias</h1>
                </div>
                <button className="logout-button">Cerrar Sesión</button>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h3>Entrenador: {} </h3>

                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre y Apellido</th>
                                <th>Username</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Fila de ingreso */}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    {/*            Buscador              */}
                                    <button className="add-button">
                                        <FaUserPlus />
                                    </button>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>

                            {/* Listado de usuarios */}
                            {currentRows.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name} {user.lastname}</td>
                                    <td>{user.username} </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => {
                                            openModal(user.username)
                                            }}>
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Controles de paginacion */}
                <div className="pagination-controls">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={`pagination-button ${currentPage === 1 ? "disabled" : ""
                            }`}
                        disabled={currentPage === 1}
                    >
                        <FaArrowLeft />
                    </button>
                    <span className="pagination-info">
                        {" "}
                        {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        className={`pagination-button ${currentPage === totalPages ? "disabled" : ""
                            }`}
                        disabled={currentPage === totalPages}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>










            {/* Modal para crear asistencias */}
            {isModalOpenAdd && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModal}>
                            &times;
                        </button>
                        <h2>Nuevo Usuario</h2>
                        <form className="user-form" onSubmit={handleSubmitPost}>
                            <label>
                                Nombre:
                                <input type="text" placeholder="Nombre" required name="name" value={form.name || ""} onChange={handleChange} />
                            </label>
                            <label>
                                Apellido:
                                <input type="text" placeholder="Apellido" required name="lastname" value={form.lastname || ""} onChange={handleChange} />
                            </label>
                            <label>
                                Usuario:
                                <input type="text" placeholder="Usuario" required name="username" value={form.username || ""} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" placeholder="Email" required name="email" value={form.email || ""} onChange={handleChange} />
                            </label>
                            <div className="password-container">
                                <label>
                                    Contraseña:
                                    <input type="password" placeholder="Contraseña" required name="password" value={form.password || ""} onChange={handleChange} />
                                </label>
                            </div>
                            <fieldset>
                                <legend>Rol:</legend>
                                <label>
                                    <input type="radio" name="role" value="administrador" required onChange={handleChange} />
                                    Administrador
                                </label>
                                <label>
                                    <input type="radio" name="role" value="entrenador" required onChange={handleChange} />
                                    Entrenador
                                </label>
                                <label>
                                    <input type="radio" name="role" value="cliente" required onChange={handleChange} />
                                    Cliente
                                </label>
                            </fieldset>
                            <label>
                                Foto de perfil:
                                <input type="file" accept="image/*" name="imagen" onChange={handleChange} />
                            </label>
                            <button type="submit" className="submit-button">
                                REGISTRAR
                            </button>
                        </form>
                    </div>
                </div>
            )}






            {/* Modal para listar asistencias */}
            {isModalOpen && (
                <div className="modal-overlay-listing">
                    <div className="modal-content-listing">
                        <div className="table-container">
                            <button className="close-modal" onClick={closeModal}>
                                &times;
                            </button>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Llegada</th>
                                        <th>Salida</th>
                                        <th>Tiempo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Fila de ingreso */}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {/*            Buscador              */}
                                            <button className="add-button">
                                                <FaUserPlus />
                                            </button>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    {/* Listado de usuarios */}
                                    {currentRows.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name} {user.lastname}</td>
                                            <td>{user.username} </td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button className="edit-button" onClick={() => {
                                                    openModal(user.username)
                                                    }}>
                                                    <FaEye />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}








            {/* Modal para eliminar usuarios */}
            {isModalOpenDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModalDelete}>
                            &times;
                        </button>
                        <h2>ESTAS SEGURO DE QUERER ELIMINAR ESTE REGISTRO?</h2>

                        <div className="choice-content">
                            <button className="submit-button" onClick={openModalNest}>
                                SI
                            </button>

                            <button className="submit-button" onClick={closeModalDelete}>
                                NO
                            </button>
                        </div>
                        <h4 style={{ color: "red", textAlign: "center" }}>
                            *NO PODRÁ REVERTIR ESTA ACCION*
                        </h4>
                    </div>
                </div>
            )}






            {/* Modal de eliminación de usuario anidado */}
            {isModalOpenNest && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="header-with-icon">
                            <h2>ELIMINADO</h2>
                            <FaTrash className="icon-trash" />
                        </div>
                        <button
                            className="submit-button"
                            onClick={handleDelete}>
                            CONTINUAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntrenadorAsistencias;
