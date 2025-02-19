// ExerciseTracker.js
import React, { useState, useEffect } from "react";
import "./Exercise.css"; // Import your CSS file for styling
import ExerciseModal from "../../Components/ExerciseModal/ExerciseModal";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import Sidebar from "../../Components/Sidebar/Sidebar";


const ExerciseTracker = () => {

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  const [workoutRoutines, setWorkoutRoutines] = useState([
    {
      name: "Cardio",
      duration: 1,
      intensity: "High",
      caloriesBurned: 250,
      distanceCovered: 0,
      image: "/images/ex.jpg",
    },
    {
      name: "Strength Training",
      duration: 0.5,
      intensity: "Moderate",
      caloriesBurned: 150,
      distanceCovered: 0,
      image: "/images/ex1.jpg",
    },
    {
      name: "Yoga",
      duration: 1,
      intensity: "Low",
      caloriesBurned: 100,
      distanceCovered: 0,
      image: "/images/ex2.jpg",
    },
  ]);

  const userInfoString = localStorage.getItem("userInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object

  console.log(userInfo); // Should log the parsed userInfo object

  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedExercises, setLoggedExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState(initializeChartData());

  useEffect(() => {
    fetchLoggedExercises();
  }, []);

  const fetchLoggedExercises = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await api.get("/api/exercise/exercises", config);
      setLoggedExercises(response.data);
      updateChartData(response.data);
    } catch (error) {
      console.error("Error fetching logged exercises:", error);
    }
  };

  const handleRoutineSelect = (routine) => {
    setSelectedRoutine(routine);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoutine(null);
  };

  const handleSaveExercise = async (exercise) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await api.post(
        "/api/exercise/create-exercise",
        exercise,
        config
      );
      console.log("Exercise saved successfully:", response.data);
      const updatedExercises = [...loggedExercises, response.data];
      setLoggedExercises(updatedExercises);
      updateChartData(updatedExercises);
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  const updateChartData = (exercises) => {
    const groupedData = groupDataByWeek(exercises);
    const labels = Object.keys(groupedData);
    const data = labels.map((week) => {
      const weekExercises = groupedData[week];
      return weekExercises.reduce((total, exercise) => {
        return total + exercise.caloriesBurned;
      }, 0);
    });
    setExerciseData({
      ...exerciseData,
      labels: labels,
      datasets: [
        {
          ...exerciseData.datasets[0],
          data: data,
        },
      ],
    });
  };

  function initializeChartData() {
    const labels = workoutRoutines.map((routine) => routine.name);
    const data = workoutRoutines.map(() => 0);

    return {
      labels: labels,
      datasets: [
        {
          label: "Calories Burned",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: data,
        },
      ],
    };
  }

  const groupDataByWeek = (exercises) => {
    const groupedData = {};
    exercises.forEach((exercise) => {
      const date = new Date(exercise.date);
      const weekNumber = getWeekNumber(date);
      if (!groupedData[weekNumber]) {
        groupedData[weekNumber] = [];
      }
      groupedData[weekNumber].push(exercise);
    });
    return groupedData;
  };

  const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const differenceInDays =
      Math.floor((date - oneJan) / (24 * 60 * 60 * 1000)) + 1;
    const weekNumber = Math.ceil(differenceInDays / 7);
    return weekNumber;
  };
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="wrapper">
      <Sidebar
        item="exercise"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <div className="container">
        <div className="dashboard">
          <PatientSidebar item="exercise" />
          <div className="main px-3">
            <div className="exercise-tracker-container container w-100">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <h2>Exercise Tracker</h2>
              <div className="routine-list">
                {workoutRoutines.map((routine, index) => (
                  <div
                    key={index}
                    className="routine-item"
                    onClick={() => handleRoutineSelect(routine)}
                  >
                    <img
                      src={routine.image}
                      className="img-fluid"
                      alt="Exercise"
                    />
                    <div className="mt-2">
                      <h3 className="mb-2">{routine.name}</h3>
                      <p className="mb-2">
                        <strong>Intensity:</strong> {routine.intensity}
                      </p>
                      <p className="mb-0">
                        <strong>Duration:</strong> {routine.duration} mins
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {isModalOpen && selectedRoutine && (
                <ExerciseModal
                  routine={selectedRoutine}
                  onSave={handleSaveExercise}
                  onClose={handleCloseModal}
                />
              )}
              <div className="exercise-history">
                <h3>Exercise History</h3>
                {loggedExercises.map((exercise, index) => (
                  <div className="exercise-item" key={index}>
                    <p>
                      <strong>Routine:</strong> {exercise.routine}
                    </p>
                    <p>
                      <strong>Duration:</strong> {exercise.duration} mins
                    </p>
                    <p>
                      <strong>Intensity:</strong> {exercise.intensity}
                    </p>
                    <p>
                      <strong>Date:</strong> {exercise.date}
                    </p>
                  </div>
                ))}
              </div>
              <div className="exercise-charts col-lg-6 col-12">
                <Bar data={exerciseData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTracker;
