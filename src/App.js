import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./Components/scrollToTop";
import Layout from "./Components/Layout";
import LazyLoading from "./Components/Loading/LazyLoading";
import Doctors from "./Pages/Doctors/Doctors";
import BookingPage from "./Pages/Booking/Booking";
import ExerciseTracker from "./Pages/Exercise/Exercise";
import NutritionTrackingPage from "./Pages/Nutrition/NutritionTrackingPage";
import SleepTrackingPage from "./Pages/Sleep/SleepTrackingPage";
import WeightTrackingPage from "./Pages/Weight/WeightTrackingPage";
import WaterTrackingPage from "./Pages/Water/WaterTrackingPage";
import Login from "./Pages/Login/Login";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Register from "./Pages/Register/Register";
import PrivateRouter from "./PrivateRouter";
const Home = lazy(() => import("./Pages/Home/Home"));


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <div className="App">
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LazyLoading />}>
                <Layout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/doctor/:id"
              element={
                <Suspense fallback={<LazyLoading />}>
                  {/* <PrivateRouter> */}
                    <Doctors />
                  {/* </PrivateRouter> */}
                </Suspense>
              }
            />
            <Route
              path="/booking"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <BookingPage />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/exercise"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <ExerciseTracker />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/nutrition"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <NutritionTrackingPage />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/sleep"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <SleepTrackingPage />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/weight"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <WeightTrackingPage />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/water"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <WaterTrackingPage />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <ProfilePage />
                  </PrivateRouter>
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
