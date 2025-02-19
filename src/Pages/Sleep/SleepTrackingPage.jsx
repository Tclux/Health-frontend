import React, { useState, useEffect } from "react";
import "./SleepTrackingPage.css";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import Sidebar from "../../Components/Sidebar/Sidebar";

const SleepTrackingPage = () => {

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  const userInfoString = localStorage.getItem("userInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object

  const [sleepData, setSleepData] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    hoursSlept: "",
    quality: "",
  });
  const [sleepHoursChartData, setSleepHoursChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Hours Slept",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: [],
      },
    ],
  });
  const [sleepQualityChartData, setSleepQualityChartData] = useState({
    labels: ["Poor", "Fair", "Good", "Excellent"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  });

  useEffect(() => {
    fetchSleepData();
  }, []);

  const fetchSleepData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await api.get("/api/sleep/sleeps", config);
      setSleepData(response.data);
      updateSleepHoursChartData(response.data);
    } catch (error) {
      console.error("Error fetching sleep data:", error);
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
      const response = await api.post(
        "/api/sleep/create-sleep",
        formData,
        config
      );
      console.log("Sleep entry added:", response.data);
      setSleepData([...sleepData, response.data]);
      setFormData({
        date: "",
        hoursSlept: "",
        quality: "",
      });
      updateSleepHoursChartData([...sleepData, response.data]);
    } catch (error) {
      console.error("Error adding sleep entry:", error);
    }
  };

  const updateSleepHoursChartData = (data) => {
    const groupedData = groupDataByWeek(data);
    const labels = Object.keys(groupedData);
    const chartData = {
      labels: labels,
      datasets: [
        {
          ...sleepHoursChartData.datasets[0],
          data: labels.map((week) =>
            groupedData[week].reduce(
              (totalHours, sleep) => totalHours + parseFloat(sleep.hoursSlept),
              0
            )
          ),
        },
      ],
    };
    setSleepHoursChartData(chartData);
    updateSleepQualityChartData(data);
  };

  const updateSleepQualityChartData = (data) => {
    const qualityCounts = { Poor: 0, Fair: 0, Good: 0, Excellent: 0 };
    data.forEach((sleep) => {
      qualityCounts[sleep.quality]++;
    });
    setSleepQualityChartData({
      ...sleepQualityChartData,
      datasets: [
        {
          ...sleepQualityChartData.datasets[0],
          data: Object.values(qualityCounts),
        },
      ],
    });
  };

  const groupDataByWeek = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const date = new Date(item.date);
      const week = getWeek(date);
      if (!groupedData[week]) {
        groupedData[week] = [];
      }
      groupedData[week].push(item);
    });
    return groupedData;
  };

  const getWeek = (date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(
      ((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
    );
  };
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };

  return (
    <div className="wrapper">
      <Sidebar
        item="sleep"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <div className="container">
        <div className="dashboard">
          <PatientSidebar item="sleep" />
          <div className="sleep-tracking-page w-100 main px-3">
            <span
              class="material-symbols-outlined open-button d-md-none d-block mb-3"
              onClick={toggleSidebar}
            >
              menu_open
            </span>

            <h2>Sleep Tracking</h2>

            <div className="w-100 row">
              <div className="sleep-chart  col-lg-6 col-12">
                <h3>Hours Slept per Week</h3>
                <Bar data={sleepHoursChartData} />
              </div>
              <div className="quality-chart col-lg-6 col-12">
                <h3>Sleep Quality Distribution</h3>
                <Pie data={sleepQualityChartData} />
              </div>
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
                <label>Hours Slept:</label>
                <input
                  type="number"
                  name="hoursSlept"
                  value={formData.hoursSlept}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Sleep Quality:</label>
                <select
                  name="quality"
                  value={formData.quality}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Poor">Poor</option>
                  <option value="Fair">Fair</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>
              <button type="submit">Add Sleep</button>
            </form>
            <div className="sleep-history">
              <h3>Sleep History</h3>
              <ul>
                {sleepData.map((sleep, index) => (
                  <li key={index}>
                    <strong>Date:</strong>{" "}
                    {new Date(sleep.date).toLocaleDateString("en-GB")},{" "}
                    <strong>Hours Slept:</strong> {sleep.hoursSlept},{" "}
                    <strong>Quality:</strong> {sleep.quality}
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

export default SleepTrackingPage;
