import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import AuthContext from "../../../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { toast } from "react-toastify"; // Notificaciones





const ClienteEntrenamientos = () => {
    const [routines, setRoutines] = useState([]);
    const [routineName, setRoutineName] = useState('');
    const [routineDescription, setRoutineDescription] = useState('');
    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [series, setSeries] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showExercisePopup, setShowExercisePopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(null);
    const [editingExerciseIndex, setEditingExerciseIndex] = useState(null);

    // Agregar rutina
    const handleAddRoutine = () => {
        const newRoutine = {
            Nombre: routineName,
            Descripcion: routineDescription,
            exercises: exercises,
        };
        setRoutines([...routines, newRoutine]);
        resetForm();
        setShowPopup(false);
    };

    // Agregar ejercicio
    const handleAddExercise = () => {
        const newExercise = {
            name: exerciseName,
            series: parseInt(series),
            repetitions: parseInt(repetitions),
        };
        if (editingExerciseIndex !== null) {
            // Editar ejercicio existente
            const updatedExercises = [...exercises];
            updatedExercises[editingExerciseIndex] = newExercise;
            setExercises(updatedExercises);
            setEditingExerciseIndex(null); // Resetear modo edición
        } else {
            // Agregar nuevo ejercicio
            setExercises([...exercises, newExercise]);
        }
        resetExerciseForm();
        setShowExercisePopup(false);
    };

    // Eliminar rutina
    const handleDeleteRoutine = (index) => {
        const updatedRoutines = routines.filter((_, i) => i !== index);
        setRoutines(updatedRoutines);
    };

    // Ver rutina
    const handleViewRoutine = (index) => {
        setSelectedRoutineIndex(index);
        setShowViewPopup(true);
    };

    // Editar rutina
    const handleEditRoutine = (index) => {
        const routineToEdit = routines[index];
        setSelectedRoutineIndex(index);
        setRoutineName(routineToEdit.Nombre);
        setRoutineDescription(routineToEdit.Descripcion);
        setExercises(routineToEdit.exercises); // Cargar los ejercicios existentes
        setShowEditPopup(true);
    };

    // Guardar edición
    const handleSaveEdit = () => {
        const updatedRoutine = {
            Nombre: routineName,
            Descripcion: routineDescription,
            exercises: exercises,
        };
        const updatedRoutines = [...routines];
        updatedRoutines[selectedRoutineIndex] = updatedRoutine;
        setRoutines(updatedRoutines);
        resetForm();
        setShowEditPopup(false);
    };

    // Eliminar ejercicio
    const handleDeleteExercise = (index) => {
        const updatedExercises = exercises.filter((_, i) => i !== index);
        setExercises(updatedExercises);
    };

    // Editar ejercicio
    const handleEditExercise = (index) => {
        const exerciseToEdit = exercises[index];
        setExerciseName(exerciseToEdit.name);
        setSeries(exerciseToEdit.series.toString());
        setRepetitions(exerciseToEdit.repetitions.toString());
        setEditingExerciseIndex(index); // Activar modo edición
        setShowExercisePopup(true);
    };

    // Resetear formulario
    const resetForm = () => {
        setRoutineName('');
        setRoutineDescription('');
        setExercises([]);
    };

    // Resetear formulario de ejercicios
    const resetExerciseForm = () => {
        setExerciseName('');
        setSeries('');
        setRepetitions('');
        setEditingExerciseIndex(null); // Resetear modo edición
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Gestión de Rutinas</h1>

            {/* Botón para abrir el popup de agregar rutina */}
            <button style={addButtonStyle} onClick={() => setShowPopup(true)}>
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
                            <td style={tableCellStyle}>{routine.Nombre}</td>
                            <td style={tableCellStyle}>{routine.Descripcion}</td>
                            <td style={tableCellStyle}>
                                <div style={actionButtonsContainerStyle}>
                                    <button
                                        style={viewButtonStyle}
                                        onClick={() => handleViewRoutine(index)}
                                    >
                                        Ver
                                    </button>
                                    <button
                                        style={editButtonStyle}
                                        onClick={() => handleEditRoutine(index)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        style={deleteButtonStyle}
                                        onClick={() => handleDeleteRoutine(index)}
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
                        <button style={secondaryButtonStyle} onClick={() => setShowExercisePopup(true)}>
                            Agregar Ejercicio
                        </button>
                        <div>
                            <h3 style={popupSubtitleStyle}>Ejercicios Agregados:</h3>
                            <ul style={exerciseListStyle}>
                                {exercises.map((exercise, index) => (
                                    <li key={index} style={exerciseItemStyle}>
                                        {exercise.name} - Series: {exercise.series}, Repeticiones: {exercise.repetitions}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button style={primaryButtonStyle} onClick={handleAddRoutine}>
                            Guardar Rutina
                        </button>
                        <button style={secondaryButtonStyle} onClick={() => setShowPopup(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Popup para agregar/editar ejercicio */}
            {showExercisePopup && (
                <div style={{ ...popupStyle, zIndex: 1001 }}> {/* Mayor z-index */}
                    <div style={popupContentStyle}>
                        <h2 style={popupTitleStyle}>
                            {editingExerciseIndex !== null ? 'Editar Ejercicio' : 'Agregar Ejercicio'}
                        </h2>
                        <input
                            type="text"
                            placeholder="Nombre del Ejercicio"
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type="number"
                            placeholder="Series"
                            value={series}
                            onChange={(e) => setSeries(e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type="number"
                            placeholder="Repeticiones"
                            value={repetitions}
                            onChange={(e) => setRepetitions(e.target.value)}
                            style={inputStyle}
                        />
                        <button style={primaryButtonStyle} onClick={handleAddExercise}>
                            {editingExerciseIndex !== null ? 'Guardar Cambios' : 'Agregar Ejercicio'}
                        </button>
                        <button style={secondaryButtonStyle} onClick={() => setShowExercisePopup(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Popup para ver rutina */}
            {showViewPopup && selectedRoutineIndex !== null && (
                <div style={popupStyle}>
                    <div style={popupContentStyle}>
                        <h2 style={popupTitleStyle}>Detalles de la Rutina</h2>
                        <p><strong>Nombre:</strong> {routines[selectedRoutineIndex].Nombre}</p>
                        <p><strong>Descripción:</strong> {routines[selectedRoutineIndex].Descripcion}</p>
                        <h3>Ejercicios:</h3>
                        <ul style={exerciseListStyle}>
                            {routines[selectedRoutineIndex].exercises.map((exercise, index) => (
                                <li key={index} style={exerciseItemStyle}>
                                    {exercise.name} - Series: {exercise.series}, Repeticiones: {exercise.repetitions}
                                </li>
                            ))}
                        </ul>
                        <button style={secondaryButtonStyle} onClick={() => setShowViewPopup(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Popup para editar rutina */}
            {showEditPopup && selectedRoutineIndex !== null && (
                <div style={{ ...popupStyle, zIndex: 1000 }}> {/* Menor z-index */}
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
                        <button style={secondaryButtonStyle} onClick={() => setShowExercisePopup(true)}>
                            Agregar Ejercicio
                        </button>
                        <div>
                            <h3 style={popupSubtitleStyle}>Ejercicios Agregados:</h3>
                            <ul style={exerciseListStyle}>
                                {exercises.map((exercise, index) => (
                                    <li key={index} style={exerciseItemStyle}>
                                        {exercise.name} - Series: {exercise.series}, Repeticiones: {exercise.repetitions}
                                        <div style={actionButtonsContainerStyle}>
                                            <button
                                                style={editButtonStyle}
                                                onClick={() => handleEditExercise(index)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                style={deleteButtonStyle}
                                                onClick={() => handleDeleteExercise(index)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button style={primaryButtonStyle} onClick={handleSaveEdit}>
                            Guardar Cambios
                        </button>
                        <button style={secondaryButtonStyle} onClick={() => setShowEditPopup(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Estilos generales
const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
};

const addButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const tableHeaderStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
};

const tableRowStyle = {
    borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
    padding: '10px',
};

const actionButtonsContainerStyle = {
    display: 'flex',
    gap: '5px',
};

const viewButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const editButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#FFC107',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const deleteButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#FF4D4D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const popupStyle = {
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
};

const popupContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const popupTitleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
};

const popupSubtitleStyle = {
    color: '#555',
    marginBottom: '10px',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const primaryButtonStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '10px',
};

const secondaryButtonStyle = {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
};

const exerciseListStyle = {
    listStyleType: 'none',
    padding: 0,
};

const exerciseItemStyle = {
    padding: '5px 0',
    borderBottom: '1px solid #ddd',
};

export default CLi;