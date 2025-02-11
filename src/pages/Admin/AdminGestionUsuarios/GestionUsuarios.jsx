import React, { useState, useEffect, useContext } from "react";
import {
    FaEdit,
    FaTrash,
    FaArrowLeft,
    FaArrowRight,
    FaUserPlus,
} from "react-icons/fa";
import "./GestionUsuarios.css";
import { DiVim } from "react-icons/di";
import { BiColor } from "react-icons/bi";
import AuthContext from "../../../contexts/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const baseFormState = {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: ""
}


const GestionUsuarios = () => {
    const { auth, token } = useContext(AuthContext)

    console.log("token: ", token, "auth: ", auth)

    //Para el post, put y delete
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        imagen: null
    })
    //Para el get
    const [users, setUsers] = useState([])
    
    //Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 6

    {
        /* Modal de agregación */
    }
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    {
        /* Modal de actualización */
    }
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)

    const openModalEdit = (userId) => {
        setIsModalOpenEdit(true);
        const usuario = users.find(user => user._id === userId);

        console.log("###############################", usuario)
        
        if (!usuario) return;
    
        setUsuarioSeleccionado(usuario);
        
        setForm({
            name: usuario.name || "",
            lastname: usuario.lastname || "",
            username: usuario.username || "",
            email: usuario.email || "",
            password: "",
            confirmPassword: ""
        });
    };
    
    

    const closeModalEdit = () => {
        setIsModalOpenEdit(false)
        setForm(baseFormState)
        setUsuarioSeleccionado({})
    }

    {
        /* Modal de eliminación */
    }
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const openModalDelete = (username) => {
        setIsModalOpenDelete(true);
        setUsuarioSeleccionado(username);

        console.log("#########################", username)
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

    const handleFileChange = async (e) => {
        setForm({
            ...form,
            imagen: e.target.files[0]
        })
    }

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

    const handleSubmitUpdate = async (e) => {
        // Para actualizar un usuario, se PUEDE enviar:
        // username, name, lastname, email, password
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}users/${usuarioSeleccionado.username}`
            
            const options = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const filteredForm = Object.fromEntries(
                Object.entries(form).filter(([_, value]) => 
                  typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined
                )
            );
            
            const formData = new FormData()
            
            if (filteredForm.name) formData.append("name", filteredForm.name)
            if (filteredForm.lastname) formData.append("lastname", filteredForm.lastname)
            if (filteredForm.username) formData.append("username", filteredForm.username)
            if (filteredForm.email) formData.append("email", filteredForm.email)
            if (filteredForm.password) formData.append("password", filteredForm.password)
            if (filteredForm.imagen) formData.append("imagen", filteredForm.imagen)

            await axios.put(url, formData, options)

            closeModalEdit()
            toast.success("Usuario actualizado exitosamente")
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error("Error al actualizar un usuario")
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
                    <h1>Gestión de Usuarios</h1>
                </div>
                <button className="logout-button">Cerrar Sesión</button>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h3>Administrador: {} </h3>

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
                                    <button className="add-button" onClick={openModal}>
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
                                            //console.log("---------------------", user._id)
                                            openModalEdit(user._id)
                                            }}>
                                            <FaEdit />
                                        </button>
                                        <button className="delete-button" onClick={() => openModalDelete(user.username)}>
                                            <FaTrash />
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










            {/* Modal para agregar usuario */}
            {isModalOpen && (
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
                            <button type="submit" className="submit-button">
                                REGISTRAR
                            </button>
                        </form>
                    </div>
                </div>
            )}






            {/* Modal para actualizar usuarios */}
            {isModalOpenEdit && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModalEdit}>
                            &times;
                        </button>
                        <h2>Editar Usuario</h2>
                        <form className="user-form" onSubmit={handleSubmitUpdate}>
                            <label>
                                Nombre:
                                <input type="text" placeholder="Nombre" required name="name" value={form.name} onChange={handleChange}  />
                            </label>
                            <label>
                                Apellido:
                                <input type="text" placeholder="Nombre" required name="lastname" value={form.lastname} onChange={handleChange} />
                            </label>
                            <label>
                                Usuario:
                                <input type="text" placeholder="Usuario" required name="username" value={form.username} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" placeholder="Email" required name="email" value={form.email} onChange={handleChange} />
                            </label>
                            <div className="password-container">
                                <label>
                                    Contraseña:
                                    <input type="password" placeholder="Contraseña" name="password" value={form.password} onChange={handleChange} />
                                </label>

                            </div>
                            
                            <label>
                                Foto de perfil:
                                <input type="file" accept="image/*" name="imagen" onChange={handleFileChange} />
                            </label>
                            
                            <button type="submit" className="submit-button">
                                ACTUALIZAR
                            </button>
                        </form>
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

export default GestionUsuarios;
