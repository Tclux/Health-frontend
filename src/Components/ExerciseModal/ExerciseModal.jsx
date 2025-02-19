// ExerciseModal.js
import React, { useState, useEffect } from "react";
import "./ExerciseModal.css";

const ExerciseModal = ({ routine, onClose, onSave }) => {
  const [timer, setTimer] = useState(routine.duration * 60);
  const [currentIntensity, setCurrentIntensity] = useState(routine.intensity);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [routine.duration, routine.intensity]);

  const handleSave = () => {
    const exercise = {
      routine: routine.name,
      duration: routine.duration * 60 - timer,
      date: new Date().toLocaleDateString(),
      intensity: currentIntensity,
    };
    onSave(exercise);
    onClose();
  };

  return (
    <div className="exercise-modal-overlay">
      <div className="exercise-modal">
        <div className="card">
          <h2>Log Exercise</h2>
          <p>
            <strong>Routine:</strong> {routine.name}
          </p>
          <p>
            <strong>Duration:</strong> {timer} s
          </p>
          <p>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </p>
          <p>
            <strong>Intensity:</strong> {currentIntensity}
          </p>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;
