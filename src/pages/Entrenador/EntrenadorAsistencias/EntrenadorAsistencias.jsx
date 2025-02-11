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
    idUser: "",
    checkInTime: "",
    checkOutTime: ""
}


const EntrenadorAsistencias = () => {
    const { auth, token } = useContext(AuthContext)
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
    const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(null)

    console.log("token: ", token, "auth: ", auth)

    //Para el post, put y delete
    const [form, setForm] = useState({
        idUser: "",
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
    const openModal = async (usernameSelected) => {
        const usuario = users.find(user => user.username === usernameSelected);
        if (!usuario) return;
        setUsuarioSeleccionado(usuario)
        setUsuarioId({idUser: usuario._id})
        setForm({username: usernameSelected})
        await handleAttendanceList(usernameSelected)
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
        setForm(baseFormState)
        setUsuarioSeleccionado({})
        setAsistencias([])
    }

    {
        /* Modal de agregado */
    }
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)
    const [usuarioId, setUsuarioId] = useState({})
    const openModalAdd = () => {
        console.log(usuarioSeleccionado)
        setForm({idUser: usuarioSeleccionado._id})
        setIsModalOpenAdd(true)
    }
    const closeModalAdd = () => {
        setIsModalOpenAdd(false)
        setForm(baseFormState)
        setUsuarioSeleccionado({})
    }



    const handleChange = async (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleAttendanceList = async (username) => {
        try
        {
            const url = `${import.meta.env.VITE_BACKEND_URL}asistencias/buscar/${username}`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setAsistencias(respuesta.data.asistencias);
        }
        catch (error)
        {

        }
    };

    const handleSubmitPost = async (e) => {
        //Para crear una asistencia, se debe enviar:
        //userId, checkInTime, checkOutTime
        e.preventDefault()
        console.log(form)
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}asistencias`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url, form, options)
            setForm(baseFormState)
            toast.success("Asistencia creada exitosamente")
            setIsModalOpen(false)
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        } catch (error) {
            toast.error("Error al crear una asistencia")
        }
    }

    const handleDelete = async (asistenciaId) => {
        //console.log("Usuariooooooooooo: ", usuarioSeleccionado)
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}asistencias/${asistenciaId}`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            await axios.delete(url, options)
            toast.success("Asistencia eliminada exitosamente")
            
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        } catch (error) {
            toast.error("Error al eliminar la asistencia")
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
                <div className="modal-overlay-create">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModalAdd}>
                            &times;
                        </button>
                        <h2>Nueva asistencia</h2>
                        <form className="user-form" onSubmit={handleSubmitPost}>
                            <label>
                                Fecha de ingreso:
                                <input type="date" placeholder="Fecha de ingreso" required name="checkInTime" value={form.checkInTime || ""} onChange={handleChange} />
                            </label>
                            <label>
                                Fecha de salida:
                                <input type="date" placeholder="Fecha de salida" required name="checkOutTime" value={form.checkOutTime || ""} onChange={handleChange} />
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
                        <button className="close-modal-listing" onClick={closeModal}>
                            &times;
                        </button>
                        <div className="table-container">
                            
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Fecha de ingreso</th>
                                        <th>Fecha de salida</th>
                                        <th>Tiempo</th>
                                        <th> <FaTrash/> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Fila de ingreso */}
                                    <tr>
                                        <td></td>
                                        <td>
                                            {/*            Buscador              */}
                                            <button className="add-button" onClick={() => {
                                                openModalAdd()
                                            }}>
                                                <FaUserPlus />
                                            </button>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    {/* Listado de usuarios */}
                                    {asistencias.map((asistencia) => (
                                        <tr key={asistencia._id}>
                                            <td>{asistencia._id}</td>
                                            <td>{asistencia.checkInTime}</td>
                                            <td>{asistencia.checkOutTime} </td>
                                            <td>{"-------"}</td>
                                            <td> <button onClick={()=>{
                                                handleDelete(asistencia._id)
                                            }}><FaTrash/></button> </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntrenadorAsistencias;
