import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";

const ClienteEntrenamientos = () => {
<<<<<<< Updated upstream
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
};