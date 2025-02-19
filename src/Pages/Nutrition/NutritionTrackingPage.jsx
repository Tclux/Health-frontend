import React, { useState, useEffect, useRef } from "react";
import "./NutritionTrackingPage.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Import ChartJS from chart.js/auto
import axios from "axios";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import Sidebar from "../../Components/Sidebar/Sidebar";

const NutritionTrackingPage = () => {

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  const [mealData, setMealData] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    mealType: "",
    foodItem: "",
    quantity: "",
    calories: "",
  });
  const [weeklyData, setWeeklyData] = useState({});
  const chartRef = useRef(null);
  // const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const userInfoString = localStorage.getItem("userInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object

  console.log(userInfo); // Should log the parsed userInfo object

  // Now you can access individual fields such as email, firstName, lastname, etc.
  if (userInfo) {
    console.log(userInfo.email);
    console.log(userInfo.firstName);
    console.log(userInfo.lastname);
    // Access other fields as needed
  } else {
    console.log("User info not found in local storage");
  }
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Retrieve user token from local storage or cookie

        // Set request headers with user token and content type
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "application/json", // Adjust content type if necessary
          },
        };

        // Make API request with axios
        const response = await api.get("/api/meal/meals", config);
        setMealData(response.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
      if (pieChartRef.current && pieChartRef.current.chartInstance) {
        pieChartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const dataByWeek = groupDataByWeek(mealData);
    setWeeklyData(dataByWeek);

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      // Ensure the chart instance exists before attempting to destroy it
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
      if (pieChartRef.current && pieChartRef.current.chartInstance) {
        pieChartRef.current.chartInstance.destroy();
      }
    };
  }, [mealData]);

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
        "/api/meal/create-meal",
        formData,
        config
      );
      console.log("Meal saved successfully:", response.data);
      setMealData([...mealData, response.data]);
      setFormData({
        date: "",
        time: "",
        mealType: "",
        foodItem: "",
        quantity: "",
        calories: "",
      });
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };
  const groupDataByWeek = (data) => {
    const weeklyData = {};
    data?.forEach((meal) => {
      const date = new Date(meal.date);
      const weekNumber = getWeekNumber(date);
      if (!weeklyData[weekNumber]) {
        weeklyData[weekNumber] = [];
      }
      weeklyData[weekNumber].push(meal);
    });
    return weeklyData;
  };

  const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const differenceInDays =
      Math.floor((date - oneJan) / (24 * 60 * 60 * 1000)) + 1;
    const weekNumber = Math.ceil(differenceInDays / 7);
    return weekNumber;
  };

  const generateChartData = () => {
    const weeks = Object.keys(weeklyData);
    const chartData = {
      labels: weeks,
      datasets: [
        {
          label: "Calories Consumed",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          data: weeks.map((week) => {
            const meals = weeklyData[week];
            return meals.reduce((totalCalories, meal) => {
              return totalCalories + parseInt(meal.calories);
            }, 0);
          }),
        },
      ],
    };
    return chartData;
  };
  const generatePieChartData = () => {
    const mealTypes = {};
    mealData?.forEach((meal) => {
      const mealType = meal.mealType;
      mealTypes[mealType] =
        (mealTypes[mealType] || 0) + parseInt(meal.calories);
    });

    const chartData = {
      labels: Object.keys(mealTypes),
      datasets: [
        {
          label: "Calories by Meal Type",
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          data: Object.values(mealTypes),
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
        item="meal"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />

      <div className="container">
        <div className="dashboard">
          <PatientSidebar item="meal" />

          <div className="nutrition-tracking-page w-100 container main px-3">
           
            <span
              class="material-symbols-outlined open-button d-md-none d-block mb-3"
              onClick={toggleSidebar}
            >
              menu_open
            </span>
            <h2>Nutrition Tracking</h2>

            <div className="weekly-chart mt-5 row">
              <div className="col-md-6 col-12">
                <h4>Weekly Calories Consumption</h4>
                <Bar
                  ref={chartRef}
                  data={generateChartData()}
                  options={{
                    title: {
                      display: true,
                      text: "Weekly Calories Consumption",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
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
              </div>
              {mealData?.length !== 0 && (
                <div className="meal-types-chart col-md-6 col-12">
                  <h4>Calories by Meal Type</h4>
                  <Pie
                    ref={pieChartRef}
                    data={generatePieChartData()}
                    options={{
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
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
                <label>Time:</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Meal Type:</label>
                <select
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
              <div className="input-group">
                <label>Food Item:</label>
                <input
                  type="text"
                  name="foodItem"
                  value={formData.foodItem}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Calories:</label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Add Meal</button>
            </form>
            {mealData?.length !== 0 && (
              <div className="meal-history mt-4 mb-4">
                <h3>Meal History</h3>
                <ul>
                  {mealData?.map((meal, index) => (
                    <li key={index}>
                      <strong>Date:</strong>{" "}
                      {new Date(meal.date).toLocaleDateString("en-GB")},{" "}
                      <strong>Time:</strong> {meal.time},{" "}
                      <strong>Meal Type:</strong> {meal.mealType},{" "}
                      <strong>Food Item:</strong> {meal.foodItem},{" "}
                      <strong>Quantity:</strong> {meal.quantity},{" "}
                      <strong>Calories:</strong> {meal.calories}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTrackingPage;
