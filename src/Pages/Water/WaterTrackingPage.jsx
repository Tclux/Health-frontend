import React, { useState, useEffect } from "react";
import "./WaterTrackingPage.css";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import Sidebar from "../../Components/Sidebar/Sidebar";

const WaterTrackingPage = () => {

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  const userInfoString = localStorage.getItem("userInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object

  const [cups, setCups] = useState(Array.from({ length: 8 }, () => false));
  const [history, setHistory] = useState([]);
  const [weeklyLiters, setWeeklyLiters] = useState({});
  const [lastSavedDate, setLastSavedDate] = useState(null);

  useEffect(() => {
    fetchWaterData();
  }, []);

  const fetchWaterData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await api.get("/api/water/waters", config);
      const parsedData = response.data.map((entry) => ({
        ...entry,
        date: new Date(entry.date), // Parse date string to Date object
      }));
      setHistory(parsedData);
      calculateWeeklyLiters(parsedData);
    } catch (error) {
      console.error("Error fetching water data:", error);
    }
  };

  const calculateWeeklyLiters = (history) => {
    const weeklyLitersData = {};
    history.forEach((entry) => {
      const date = new Date(entry.date);
      const weekNumber = getWeekNumber(date);
      if (!weeklyLitersData[weekNumber]) {
        weeklyLitersData[weekNumber] = 0;
      }
      weeklyLitersData[weekNumber] += entry.litersDrank;
    });
    setWeeklyLiters(weeklyLitersData);
  };

  const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const differenceInDays =
      Math.floor((date - oneJan) / (24 * 60 * 60 * 1000)) + 1;
    const weekNumber = Math.ceil(differenceInDays / 7);
    return weekNumber;
  };

  const handleCupClick = (idx) => {
    if (lastSavedDate && isSameDay(new Date(), lastSavedDate)) {
      return;
    }
    const newCups = [...cups];
    if (
      newCups[idx] &&
      newCups[idx + 1] &&
      newCups[idx].classList &&
      newCups[idx].classList.contains("active") &&
      newCups[idx + 1] &&
      !newCups[idx + 1].classList.contains("active")
    ) {
      idx--;
    }
    for (let i = 0; i <= idx; i++) {
      newCups[i] = true;
    }
    setCups(newCups);
    updateCups(newCups);
  };

  const updateCups = (newCups) => {
    const activeCups = newCups.filter(Boolean).length;
    const totalCups = newCups.length;
    const percentage = (activeCups / totalCups) * 100;

    const percentageElement = document.querySelector(".percentage");
    const remainedElement = document.querySelector(".remained");
    const litreElement = document.querySelector(".litre");

    if (activeCups === 0) {
      percentageElement.style.height = 0;
      percentageElement.style.visibility = "hidden";
    } else {
      percentageElement.style.height = `${percentage}%`;
      percentageElement.textContent = `${percentage}%`;
      percentageElement.style.visibility = "visible";
    }

    litreElement.textContent = `${2 - (activeCups * 250) / 1000}L`;

    if (activeCups === totalCups) {
      litreElement.textContent = "Full";
      remainedElement.style.height = 0;
    }
  };

  const handleSave = async () => {
    const activeCups = cups.filter(Boolean).length;
    const litersDrank = (activeCups * 250) / 1000;
    const currentDate = new Date();
    setLastSavedDate(currentDate);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      await api.post(
        "/api/water/create-water",
        {
          date: currentDate,
          litersDrank,
        },
        config
      );
      fetchWaterData(); // Fetch updated data after saving
    } catch (error) {
      console.error("Error saving water data:", error);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const highlightCups = (idx) => {
    const cupSmall = document.querySelectorAll(".cup-small");
    if (
      cupSmall[idx] &&
      cupSmall[idx + 1] &&
      cupSmall[idx].classList &&
      cupSmall[idx].classList.contains("active") &&
      cupSmall[idx + 1].classList &&
      !cupSmall[idx + 1].classList.contains("active")
    ) {
      idx--;
    }

    cupSmall.forEach((cup, idx2) => {
      if (idx >= idx2) {
        cup.classList.add("active");
      } else {
        cup.classList.remove("active");
      }
    });

    updateCups(
      Array.from(cupSmall).map((cup) => cup.classList.contains("active"))
    );
  };

  const generateBarChartData = () => {
    const weeks = Object.keys(weeklyLiters);
    const chartData = {
      labels: weeks,
      datasets: [
        {
          label: "Liters Drank",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          data: weeks.map((week) => weeklyLiters[week]),
        },
      ],
    };
    return chartData;
  };

  const generateLineChartData = () => {
    const weeks = Object.keys(weeklyLiters);
    const chartData = {
      labels: weeks,
      datasets: [
        {
          label: "Liters Drank",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: weeks.map((week) => weeklyLiters[week]),
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
        item="water"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <div className="container">
        <div className="dashboard">
          <PatientSidebar item="water" />
          <div className="water-tracking-app main w-100">
            <span
              class="material-symbols-outlined open-button d-md-none d-block mb-3"
              onClick={toggleSidebar}
            >
              menu_open
            </span>
            <div className="container">
              <div className="charts row">
                <div className="bar-chart col-lg-6 col-12">
                  <h5>Weekly Liters Drank (Bar Chart)</h5>
                  <Bar
                    data={generateBarChartData()}
                    options={{
                      // maintainAspectRatio: false,
                      // responsive: true,
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
                <div className="line-chart col-lg-6 col-12">
                  <h5>Weekly Liters Drank (Line Chart)</h5>
                  <Line
                    data={generateLineChartData()}
                    options={{
                      // maintainAspectRatio: false,
                      // responsive: true,
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
              </div>
              <div className="water">
                <h3>DRINK WATER APP</h3>
                <p>Your Goal is to drink 2L of water everyday</p>
                <div className="cup">
                  <div className="remained">
                    <span className="litre">2L</span>
                    <small>Remained</small>
                  </div>
                  <div className="percentage">0%</div>
                </div>
                <h4 className="text">
                  Select how many glasses of water you have drank
                </h4>
                <div className="cups">
                  {cups.map((cup, idx) => (
                    <div
                      key={idx}
                      className={`cup cup-small ${cup ? "active" : ""}`}
                      onClick={() => {
                        handleCupClick(idx);
                        highlightCups(idx);
                      }}
                      style={{
                        pointerEvents:
                          lastSavedDate && isSameDay(new Date(), lastSavedDate)
                            ? "none"
                            : "auto",
                      }}
                    >
                      {cup ? (
                        <div className="me">250 mL</div>
                      ) : (
                        <span>250 mL</span>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSave}
                  disabled={
                    lastSavedDate && isSameDay(new Date(), lastSavedDate)
                  }
                >
                  Save
                </button>
              </div>
              <div className="history">
                <h4>History</h4>
                <ul>
                  {history?.map((entry, index) => (
                    <li key={index}>
                      Date: {entry?.date?.toLocaleDateString()}, Liters Drank:{" "}
                      {entry.litersDrank}L
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTrackingPage;
