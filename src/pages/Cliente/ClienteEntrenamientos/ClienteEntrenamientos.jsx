import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";

const ClienteEntrenamientos = () => {
    const { username } = useParams(); // Obtener el nombre de usuario desde la URL
    const { token } = useContext(AuthContext); // Token de autenticación
    const [routines, setRoutines] = useState([]); // Lista de rutinas
    const [routineName, setRoutineName] = useState(""); // Nombre de la rutina
    const [routineDescription, setRoutineDescription] = useState(""); // Descripción de la rutina
    const [exercises, setExercises] = useState([]); // Ejercicios de la rutina
    const [exerciseName, setExerciseName] = useState(""); // Nombre del ejercicio
    const [series, setSeries] = useState(""); // Series del ejercicio
    const [repetitions, setRepetitions] = useState(""); // Repeticiones del ejercicio
    const [showPopup, setShowPopup] = useState(false); // Control del popup de agregar/editar
    const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(null); // Índice de la rutina seleccionada
    const [showExercisePopup, setShowExercisePopup] = useState(false); // Control del popup de agregar/editar ejercicio
    const [editingExerciseIndex, setEditingExerciseIndex] = useState(null); // Índice del ejercicio en edición
    const [showViewPopup, setShowViewPopup] = useState(false); // Control del popup de ver rutina
    const [showEditPopup, setShowEditPopup] = useState(false); // Control del popup de editar rutina

    // Notificaciones
    const [notification, setNotification] = useState(null);
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000); // Ocultar notificación después de 5 segundos
    };

    // Obtener rutinas del backend
    useEffect(() => {
        const fetchRoutines = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}rutinas/${username}`; // Usamos el username del contexto
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await axios.get(url, options);
                console.log("Datos recibidos del backend:", response.data); // Verifica los datos aquí

                setRoutines(response.data);
            } catch (error) {
                console.error("Error al obtener las rutinas", error);
                showNotification("error", "No se pudieron cargar las rutinas.");
            }
        };
        fetchRoutines();
    }, [username, token]);

    // Agregar una nueva rutina
    const handleAddRoutine = async () => {
        const newRoutine = {
            Nombre: routineName,
            Descripcion: routineDescription,
            exercises: exercises,
        };
        const url = `${import.meta.env.VITE_BACKEND_URL}rutinas`;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.post(url, newRoutine, options);
            setRoutines([...routines, response.data]);
            resetForm();
            setShowPopup(false);
            showNotification("success", "Rutina agregada correctamente.");
        } catch (error) {
            console.error("Error al agregar la rutina", error);
            showNotification("error", "No se pudo agregar la rutina.");
        }
    };

    // Guardar edición de una rutina
    const handleSaveEdit = async () => {
        if (selectedRoutineIndex === null) return;

        const updatedRoutine = {
            Nombre: routineName,
            Descripcion: routineDescription,
            exercises: exercises,
        };
        const url = `${import.meta.env.VITE_BACKEND_URL}rutinas/${selectedRoutineIndex}`;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.put(url, updatedRoutine, options);
            const updatedRoutines = routines.map((routine) =>
                routine._id === selectedRoutineIndex ? response.data : routine
            );
            setRoutines(updatedRoutines);
            resetForm();
            setShowEditPopup(false);
            showNotification("success", "Rutina actualizada correctamente.");
        } catch (error) {
            console.error("Error al editar la rutina", error);
            showNotification("error", "No se pudo actualizar la rutina.");
        }
    };

    // Eliminar una rutina
    const handleDeleteRoutine = async (id) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}rutinas/${id}`;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            await axios.delete(url, options);
            const updatedRoutines = routines.filter((routine) => routine._id !== id);
            setRoutines(updatedRoutines);
            showNotification("success", "Rutina eliminada correctamente.");
        } catch (error) {
            console.error("Error al eliminar la rutina", error);
            showNotification("error", "No se pudo eliminar la rutina.");
        }
    };

    // Abrir modal para editar una rutina
    const handleEditRoutine = (index) => {
        const routineToEdit = routines[index];
        setSelectedRoutineIndex(routineToEdit._id);
        setRoutineName(routineToEdit.Nombre);
        setRoutineDescription(routineToEdit.Descripcion);
        setExercises(routineToEdit.exercises);
        setShowEditPopup(true);
    };

    // Limpiar campos del formulario
    const resetForm = () => {
        setRoutineName("");
        setRoutineDescription("");
        setExercises([]);
    };




    return (
        <div style={containerStyle}>
            {/* Botón para abrir el popup de agregar rutina */}
            <button onClick={() => setShowPopup(true)} style={addButtonStyle}>
                Agregar Rutinas
            </button>

            {/* Tabla de rutinas */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Nombre</th>
                        <th style={tableHeaderStyle}>Descripción</th>
                        <th style={tableHeaderStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {routines.map((routine, index) => (
                        <tr key={index} style={tableRowStyle}>
                            <td style={tableCellStyle}>{routine.name}</td>
                            <td style={tableCellStyle}>{routine.description}</td>
                            <td style={tableCellStyle}>
                                <div style={actionButtonsContainerStyle}>
                                    <button
                                        onClick={() => setShowViewPopup(true)}
                                        style={viewButtonStyle}
                                    >
                                        Ver
                                    </button>
                                    <button
                                        onClick={() => handleEditRoutine(index)}
                                        style={editButtonStyle}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRoutine(routine._id)}
                                        style={deleteButtonStyle}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup para agregar rutina */}
            {showPopup && (
                <div style={popupStyle}>
                    <div style={popupContentStyle}>
                        <h2 style={popupTitleStyle}>Agregar Rutina</h2>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={routineName}
                            onChange={(e) => setRoutineName(e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={routineDescription}
                            onChange={(e) => setRoutineDescription(e.target.value)}
                            style={inputStyle}
                        />
                        <button onClick={() => setShowExercisePopup(true)} style={secondaryButtonStyle}>
                            Agregar Ejercicio
                        </button>
                        <ul style={exerciseListStyle}>
                            {exercises.map((exercise, index) => (
                                <li key={index} style={exerciseItemStyle}>
                                    {exercise.name} - Series: {exercise.series}, Repeticiones: {exercise.repetitions}
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleAddRoutine} style={primaryButtonStyle}>
                            Guardar Rutina
                        </button>
                        <button onClick={() => setShowPopup(false)} style={secondaryButtonStyle}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Popup para editar rutina */}
            {showEditPopup && (
                <div style={popupStyle}>
                    <div style={popupContentStyle}>
                        <h2 style={popupTitleStyle}>Editar Rutina</h2>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={routineName}
                            onChange={(e) => setRoutineName(e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={routineDescription}
                            onChange={(e) => setRoutineDescription(e.target.value)}
                            style={inputStyle}
                        />
                        <button onClick={() => setShowExercisePopup(true)} style={secondaryButtonStyle}>
                            Agregar Ejercicio
                        </button>
                        <ul style={exerciseListStyle}>
                            {exercises.map((exercise, index) => (
                                <li key={index} style={exerciseItemStyle}>
                                    {exercise.name} - Series: {exercise.series}, Repeticiones: {exercise.repetitions}
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleSaveEdit} style={primaryButtonStyle}>
                            Guardar Cambios
                        </button>
                        <button onClick={() => setShowEditPopup(false)} style={secondaryButtonStyle}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
