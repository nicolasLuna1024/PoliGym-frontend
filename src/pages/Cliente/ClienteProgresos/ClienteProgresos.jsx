import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";

const ClienteProgresos = () => {
    const { username } = useParams();
    const { token } = useContext(AuthContext);
    const [progresos, setProgresos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewModalData, setViewModalData] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [details, setDetails] = useState([{ name: '', measure: '' }]);
    const [notification, setNotification] = useState(null); // Estado para manejar notificaciones

    // Función para mostrar notificaciones
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000); // Ocultar notificación después de 5 segundos
    };

    // Obtener los datos de progreso del backend
    useEffect(() => {
        const fetchProgresos = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}progresos/${username}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            try {
                const respuesta = await axios.get(url, options);
                setProgresos(respuesta.data);
            } catch (error) {
                console.error("Error al obtener los progresos", error);
                showNotification('error', "No se pudieron cargar los progresos.");
            }
        };
        fetchProgresos();
    }, [username, token]);

    // Manejar cambios en los campos del formulario
    const handleDetailsChange = (index, field, value) => {
        const updatedDetails = [...details];
        updatedDetails[index][field] = field === 'measure' ? Number(value) : value; // Convertir 'measure' a número
        setDetails(updatedDetails);
    };

    // Agregar un nuevo campo de detalle
    const addDetailField = () => {
        setDetails([...details, { name: '', measure: '' }]);
    };

    // Eliminar un campo de detalle
    const removeDetailField = (index) => {
        const updatedDetails = details.filter((_, i) => i !== index);
        setDetails(updatedDetails);
    };

    // Guardar los datos ingresados (Agregar o Editar)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Función para formatear fechas
        const formatDateForBackend = (isoDate) => {
            if (!isoDate) return ''; // Manejar casos donde la fecha sea nula o indefinida
            const date = new Date(isoDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegura que tenga dos dígitos
            const day = String(date.getDate()).padStart(2, '0'); // Asegura que tenga dos dígitos
            return `${year}-${month}-${day}`;
        };

        const formattedDateStart = formatDateForBackend(dateStart);
        const formattedDateEnd = formatDateForBackend(dateEnd);

        // Validar los detalles
        const isValidDetails = details.every(detail =>
            typeof detail.name === 'string' &&
            typeof detail.measure === 'number' &&
            detail.name.trim() !== '' &&
            !isNaN(detail.measure)
        );

        if (!isValidDetails) {
            console.error("Los detalles no son válidos:", details);
            showNotification('error', "Los detalles ingresados no son válidos.");
            return;
        }

        // Construir el objeto a enviar
        const newEntry = {
            dateStart: formattedDateStart,
            dateEnd: formattedDateEnd,
            details,
            idUser: username // Incluir el campo idUser
        };

        const url = editIndex !== null
            ? `${import.meta.env.VITE_BACKEND_URL}progresos/${progresos[editIndex]._id}`
            : `${import.meta.env.VITE_BACKEND_URL}progresos`;
        const method = editIndex !== null ? 'PUT' : 'POST';
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const respuesta = await axios[method.toLowerCase()](url, newEntry, options);

            if (editIndex !== null) {
                // Actualizar entrada existente
                const updatedProgresos = [...progresos];
                updatedProgresos[editIndex] = respuesta.data;
                setProgresos(updatedProgresos);
                setEditIndex(null);
                showNotification('success', "Entrada actualizada correctamente.");
            } else {
                // Agregar nueva entrada
                setProgresos([...progresos, respuesta.data]);
                showNotification('success', "Entrada agregada correctamente.");
            }

            // Limpiar campos
            setDateStart('');
            setDateEnd('');
            setDetails([{ name: '', measure: '' }]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al guardar la entrada", error);
            if (error.response) {
                const { msg, errores } = error.response.data;
                console.error("Respuesta del backend:", { msg, errores });
                showNotification('error', msg || "No se pudo guardar la entrada.");
            }
        }
    };

    // Abrir modal para editar una entrada
    const handleEdit = (index) => {
        const entryToEdit = progresos[index];
        setDateStart(entryToEdit.dateStart); // No es necesario formatear aquí, ya está en el formato correcto
        setDateEnd(entryToEdit.dateEnd);     // No es necesario formatear aquí, ya está en el formato correcto
        setDetails(entryToEdit.details.map(detail => ({ ...detail, measure: Number(detail.measure) }))); // Convertir 'measure' a número
        setEditIndex(index);
        setIsModalOpen(true);
    };

    // Eliminar una entrada
    const handleDelete = async (index) => {
        const entryToDelete = progresos[index];
        const url = `${import.meta.env.VITE_BACKEND_URL}progresos/${entryToDelete._id}`;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        try {
            await axios.delete(url, options);
            const updatedProgresos = progresos.filter((_, i) => i !== index);
            setProgresos(updatedProgresos);
            showNotification('success', "Entrada eliminada correctamente.");
        } catch (error) {
            console.error("Error al eliminar la entrada", error);
            showNotification('error', "No se pudo eliminar la entrada.");
        }
    };

    return (
        <div style={styles.container}>
            {/* Notificación */}
            {notification && (
                <div role="alert" className={`rounded-xl border p-4 mb-4 ${notification.type === 'success' ? 'border-gray-100 bg-white text-green-600' : 'border-red-500 bg-red-50 text-red-800'}`}>
                    <div className="flex items-start gap-4">
                        <span>
                            {notification.type === 'success' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </span>
                        <div className="flex-1">
                            <strong className="block font-medium">
                                {notification.type === 'success' ? 'Cambios guardados' : 'Algo salió mal'}
                            </strong>
                            <p className={`mt-1 text-sm ${notification.type === 'success' ? 'text-gray-700' : 'text-red-700'}`}>
                                {notification.message}
                            </p>
                        </div>
                        <button
                            className="text-gray-500 hover:text-gray-600 transition focus:outline-none"
                            onClick={() => setNotification(null)}
                            style={{ padding: '2px', margin: '0', width: '45px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Ajuste de padding y margen
                        >
                            <span className="sr-only">Dismiss popup</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="black"
                                className="size-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Título */}
            <h1 style={styles.title}>Registro de Progreso</h1>

            {/* Botón para abrir el modal */}
            <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
                Agregar Entrada
            </button>

            {/* Modal para agregar/editar entradas */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContentScrollable}>
                        <h2 style={styles.modalTitle}>{editIndex !== null ? 'Editar Entrada' : 'Agregar Entrada'}</h2>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Fecha Inicio:</label>
                                <input
                                    type="date"
                                    value={dateStart}
                                    onChange={(e) => setDateStart(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Fecha Fin:</label>
                                <input
                                    type="date"
                                    value={dateEnd}
                                    onChange={(e) => setDateEnd(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            {/* Detalles dinámicos */}
                            <div style={styles.detailsContainer}>
                                {details.map((detail, index) => (
                                    <div key={index} style={styles.detailGroup}>
                                        <label style={styles.label}>Nombre:</label>
                                        <input
                                            type="text"
                                            value={detail.name}
                                            onChange={(e) => handleDetailsChange(index, 'name', e.target.value)}
                                            required
                                            style={styles.input}
                                        />
                                        <label style={styles.label}>Medida:</label>
                                        <input
                                            type="number"
                                            value={detail.measure}
                                            onChange={(e) => handleDetailsChange(index, 'measure', e.target.value)}
                                            required
                                            style={styles.input}
                                        />
                                        <button
                                            onClick={() => removeDetailField(index)}
                                            style={styles.deleteButton}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addDetailField} style={styles.button}>
                                Agregar Detalle
                            </button>
                            <div style={styles.modalActions}>
                                <button type="submit" style={styles.button}>
                                    {editIndex !== null ? 'Actualizar' : 'Agregar'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={styles.cancelButton}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tabla para mostrar las entradas */}
            <table style={styles.table}>
                <thead style={styles.tableHeaderRow}>
                    <tr>
                        <th style={styles.tableHeader}>#</th>
                        <th style={styles.tableHeader}>Fecha Inicio</th>
                        <th style={styles.tableHeader}>Fecha Fin</th>
                        <th style={styles.tableHeader}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {progresos.length > 0 ? (
                        progresos.map((progreso, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.tableCell}>{index + 1}</td>
                                <td style={styles.tableCell}>
                                    {new Date(progreso.dateStart).toLocaleDateString()}
                                </td>
                                <td style={styles.tableCell}>
                                    {new Date(progreso.dateEnd).toLocaleDateString()}
                                </td>
                                <td style={styles.tableCell}>
                                    <div style={styles.actionsContainer}>
                                        <button
                                            onClick={() => setViewModalData(progreso.details)}
                                            style={styles.viewButton}
                                        >
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => handleEdit(index)}
                                            style={styles.editButton}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            style={styles.deleteButton}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={styles.tableCell}>
                                No hay progresos disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal para ver detalles */}
            {viewModalData && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>Detalles</h2>
                        <table style={styles.detailTable}>
                            <thead>
                                <tr>
                                    <th style={styles.detailTableHeader}>Nombre</th>
                                    <th style={styles.detailTableHeader}>Medida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewModalData.map((detail, index) => (
                                    <tr key={index}>
                                        <td style={styles.detailTableCell}>{detail.name}</td>
                                        <td style={styles.detailTableCell}>{detail.measure}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={() => setViewModalData(null)}
                            style={styles.cancelButton}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Estilos definidos previamente
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    addButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginBottom: '20px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContentScrollable: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    form: {
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#555',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '5px',
        transition: 'border-color 0.3s ease',
    },
    detailsContainer: {
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
    },
    detailGroup: {
        marginBottom: '15px',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    tableHeaderRow: {
        backgroundColor: '#007bff',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    tableHeader: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
        transition: 'background-color 0.3s ease',
    },
    tableCell: {
        padding: '12px',
        verticalAlign: 'middle',
    },
    actionsContainer: {
        display: 'flex',
        gap: '10px', // Espacio entre los botones
    },
    viewButton: {
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#ffc107',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    detailTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
    },
    detailTableHeader: {
        padding: '8px',
        backgroundColor: '#007bff',
        color: '#fff',
        textAlign: 'left',
    },
    detailTableCell: {
        padding: '8px',
        borderBottom: '1px solid #ddd',
    },
};

export default ClienteProgresos;