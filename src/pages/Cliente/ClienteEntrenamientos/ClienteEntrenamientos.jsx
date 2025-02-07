import React, { useContext, useState } from "react";
import axios from "axios"
import AuthContext from "../../../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

//Borrar el import de Navbar
// import Navbar from "../../../components/navegacion/navbar";
// import "../ClienteEntrenamientos/ClienteEntrenamientos.css";


// const ClienteEntrenamientos = () => {

//     const {auth, token} = useContext(AuthContext)

//     console.log(auth)
//     console.log(token)

//     const handleSubmitTest = async () => {
//         const url = `${import.meta.env.VITE_BACKEND_URL}asistencias`;

//         try {            
//             const response = await axios.get(url, {
//                 withCredentials: true, // Enviar cookies automáticamente
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             });

//             console.log("Respuesta recibida:", response);
//             toast.success("Solicitud hecha con éxito")
//         } catch (error) {
//             console.error("Error en la solicitud:", error);
//         }
//     };

// /*
//     const handleSubmitTest = async (e) => {
//         e.preventDefault();
//         try {
//             const url = `${import.meta.env.VITE_BACKEND_URL}asistencias`

//             const options = {
//                 headers: {
//                     'Content-Type': 'application/json',

//                     Authorization: `Bearer ${token}`
//                 },
//                 withCredentials: true
//             }

//             //const respuesta = await axios.get(url, options, {withCredentials: true}) OJO - Meritorio de análisis recordatorio ----------------------------------------------------------------------------------------------------
//             const respuesta = await axios.get(url, options)
//             console.log(respuesta)
//             toast.success("Solicitud hecha con éxito")
//         } catch (error) {
//             toast.error("Error al realizar la solicitud")
//         }
//     }
//         */

//     return (
//         <div>
//             <ToastContainer/>
//             <form onSubmit={handleSubmitTest}>
//                 <button type="submit">Testear</button>
//             </form>
//             <div className="relative overflow-hidden shadow-md rounded-lg w-1/2 mx-auto">
//                 <table className="table-fixed w-full text-left">
//                     <thead className="uppercase bg-gray-600 text-gray-200">
//                         <tr>
//                             <td className="py-3 border text-center p-4" >Nombre</td>
//                             <td className="py-2 border text-center p-4" >Descripción</td>
//                             <td className="py-2 border text-center p-4" >Series</td>
//                             <td className="py-2 border text-center p-4" >Repeticiones</td>
//                             <td className="py-2 border text-center p-2 w-16 text-xs" >Edit</td>
//                             <td className="py-2 border text-center p-2 w-16 text-xs" >Delete</td>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white text-gray-500">
//                         <tr>
//                             <td className="py-5 border text-center p-4" >YY-853581</td>
//                             <td className="py-5 border text-center p-4" >Notebook Basic</td>
//                             <td className="py-5 border text-center p-4" >$ 299</td>
//                             <td className="py-5 border text-center p-4" >YY-853599</td>
//                             <td className="py-5 border text-center p-2 w-16" ><button className="bg-white text-black border border-gray-300 rounded px-2 py-1" >🖊️</button></td>
//                             <td className="py-5 border text-center p-2 w-16" ><button className="bg-white text-black border border-gray-300 rounded px-2 py-1">🗑️</button></td>

//                         </tr>
//                         {[...Array(5)].map((_, index) => (
//                             <tr key={index}>
//                                 <td className="py-5 border text-center p-4" ></td>
//                                 <td className="py-5 border text-center p-4" ></td>
//                                 <td className="py-5 border text-center p-4" ></td>
//                                 <td className="py-5 border text-center p-4" ></td>
//                                 <td className="py-5 border text-center p-2 w-16" ><button className="bg-white text-black border border-gray-300 rounded px-2 py-1" >🖊️</button></td>
//                                 <td className="py-5 border text-center p-2 w-16" ><button className="bg-white text-black border border-gray-300 rounded px-2 py-1">🗑️</button></td>

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };



const ClienteEntrenamientos = () => {
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [details, setDetails] = useState([{ name: '', measure: '' }]);
    const [entries, setEntries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewModalData, setViewModalData] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    // Manejar cambios en los campos del formulario
    const handleDetailsChange = (index, field, value) => {
        const updatedDetails = [...details];
        updatedDetails[index][field] = value;
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

    // Guardar los datos ingresados
    const handleSubmit = (e) => {
        e.preventDefault();

        const newEntry = {
            dateStart,
            dateEnd,
            details,
        };

        if (editIndex !== null) {
            // Editar entrada existente
            const updatedEntries = [...entries];
            updatedEntries[editIndex] = newEntry;
            setEntries(updatedEntries);
            setEditIndex(null);
        } else {
            // Agregar nueva entrada
            setEntries([...entries, newEntry]);
        }

        // Limpiar campos
        setDateStart('');
        setDateEnd('');
        setDetails([{ name: '', measure: '' }]);
        setIsModalOpen(false);
    };

    // Abrir modal para editar una entrada
    const handleEdit = (index) => {
        const entryToEdit = entries[index];
        setDateStart(entryToEdit.dateStart);
        setDateEnd(entryToEdit.dateEnd);
        setDetails(entryToEdit.details);
        setEditIndex(index);
        setIsModalOpen(true);
    };

    // Eliminar una entrada
    const handleDelete = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Registro de Progreso</h2>

            {/* Botón para abrir el modal */}
            <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
                Agregar Entrada
            </button>

            {/* Modal para agregar/editar entradas */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContentScrollable}>
                        <h3 style={styles.modalTitle}>{editIndex !== null ? 'Editar Entrada' : 'Agregar Entrada'}</h3>
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
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Nombre:</label>
                                            <input
                                                type="text"
                                                value={detail.name}
                                                onChange={(e) => handleDetailsChange(index, 'name', e.target.value)}
                                                required
                                                style={styles.input}
                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Medida:</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={detail.measure}
                                                onChange={(e) => handleDetailsChange(index, 'measure', e.target.value)}
                                                required
                                                style={styles.input}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeDetailField(index)}
                                            style={styles.deleteButton}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button type="button" onClick={addDetailField} style={styles.addButton}>
                                Agregar Detalle
                            </button>

                            <div style={styles.modalActions}>
                                <button type="submit" style={styles.button}>
                                    {editIndex !== null ? 'Actualizar' : 'Agregar'}
                                </button>
                                <button onClick={() => setIsModalOpen(false)} style={styles.cancelButton}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tabla para mostrar las entradas */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeaderRow}>
                        <th style={styles.tableHeader}>#</th>
                        <th style={styles.tableHeader}>Fecha Inicio</th>
                        <th style={styles.tableHeader}>Fecha Fin</th>
                        <th style={styles.tableHeader}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => (
                        <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableCell}>{index + 1}</td>
                            <td style={styles.tableCell}>{entry.dateStart}</td>
                            <td style={styles.tableCell}>{entry.dateEnd}</td>
                            <td style={styles.tableCell}>
                                <div style={styles.actionsContainer}>
                                    <button
                                        onClick={() => setViewModalData(entry.details)}
                                        style={styles.viewButton}
                                    >
                                        Ver
                                    </button>
                                    <button onClick={() => handleEdit(index)} style={styles.editButton}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(index)} style={styles.deleteButton}>
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para ver detalles */}
            {viewModalData && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalTitle}>Detalles</h3>
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
                        <button onClick={() => setViewModalData(null)} style={styles.cancelButton}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Estilos mejorados para diseño simple y elegante
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



export default ClienteEntrenamientos;