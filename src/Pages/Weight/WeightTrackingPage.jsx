import React, { useState, useEffect } from "react";
import "./WeightTrackingPage.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import Sidebar from "../../Components/Sidebar/Sidebar";

const WeightTrackingPage = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });
  const userInfoString = localStorage.getItem("userInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object
  const [weightData, setWeightData] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    weight: "",
  });
  const [weeklyWeights, setWeeklyWeights] = useState({});

  useEffect(() => {
    fetchWeightData();
  }, []);

  useEffect(() => {
    calculateWeeklyWeights();
  }, [weightData]);

  const fetchWeightData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await api.get("/api/weight/weights", config);
      setWeightData(response.data);
    } catch (error) {
      console.error("Error fetching weight data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      await api.post("/api/weight/create-weight", formData, config);
      fetchWeightData(); // Fetch updated data after saving
      fetchWeightData();
      setFormData({
        date: "",
        weight: "",
      });
    } catch (error) {
      console.error("Error saving weight data:", error);
    }
  };

  const calculateWeeklyWeights = () => {
    const weeklyWeightsData = {};
    weightData.forEach((entry) => {
      const date = new Date(entry.date);
      const weekNumber = getWeekNumber(date);
      if (!weeklyWeightsData[weekNumber]) {
        weeklyWeightsData[weekNumber] = [];
      }
      weeklyWeightsData[weekNumber].push(entry.weight);
    });
    setWeeklyWeights(weeklyWeightsData);
  };

  const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const differenceInDays =
      Math.floor((date - oneJan) / (24 * 60 * 60 * 1000)) + 1;
    const weekNumber = Math.ceil(differenceInDays / 7);
    return weekNumber;
  };

  const generateBarChartData = () => {
    const weeks = Object.keys(weeklyWeights);
    const chartData = {
      labels: weeks,
      datasets: [
        {
          label: "Weight per Week (kg)",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          data: weeks.map((week) => {
            const weights = weeklyWeights[week];
            const totalWeight = weights.reduce(
              (acc, weight) => acc + weight,
              0
            );
            return totalWeight;
          }),
        },
      ],
    };
    return chartData;
  };
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div className="wrapper">
      <Sidebar
        item="weight"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <div className="container">
        <div className="dashboard">
          <PatientSidebar item="weight" />
          <div className="weight-tracking-page main w-100">
            <span
              class="material-symbols-outlined open-button d-md-none d-block mb-3"
              onClick={toggleSidebar}
            >
              menu_open
            </span>
            <h2>Weight Tracking</h2>
            <div className="bar-chart col-lg-6 col-12">
              <h3>Weight per Week (Bar Chart)</h3>
              {weeklyWeights && (
                <Bar
                  data={generateBarChartData()}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                />
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Weight (kg):</label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Log Weight</button>
            </form>
            <div className="weight-history">
              <h3>Weight History</h3>
              <ul>
                {weightData.map((entry, index) => (
                  <li key={index}>
                    <strong>Date:</strong>{" "}
                    {new Date(entry.date).toLocaleDateString("en-GB")} {""}
                    <strong>Weight:</strong> {entry.weight} kg
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightTrackingPage;
