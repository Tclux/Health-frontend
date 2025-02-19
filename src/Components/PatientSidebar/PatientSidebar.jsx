import React from "react";
import "./PatientSidebar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logout } from "../../Redux/Actions/UserActions";

// import { getPatient } from "../../Redux/Actions/PatientActions";
const PatientSidebar = ({ item }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  console.log(user);
  // // Assuming patient?.dob is "1985-07-10T00:00:00.000Z"
  // const dob = new Date(patient?.dob);
  // const options = { year: "numeric", month: "short", day: "2-digit" };

  // // Format date to "24 Jul 1983"
  // const formattedDate = dob.toLocaleDateString("en-GB", options);

  // // Calculate age
  // let today = new Date();
  // let age = today.getFullYear() - dob.getFullYear();
  // // Adjust age if birthday hasn't occurred yet this year
  // if (
  //   today.getMonth() < dob.getMonth() ||
  //   (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  // ) {
  //   age--;
  // }

  // // Display formatted date and age
  // console.log(formattedDate); // Output: "10 Jul 1985"
  // console.log(age); // Output: 38

  React.useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <>
      <div className="sidebar d-md-block d-none">
        <div className="d-flex align-items-center flex-column justify-content-center p-top">
          <div className="p-profile-img">
            <img className="img-fluid" src="/images/p.jpg" />
          </div>
          <h4 className="mt-2">
            {user?.user?.firstName} {user?.user?.lastName}
          </h4>
        </div>
        <Link
          to={"/profile"}
          className={`d-flex gap-1 align-items-center p-3 p-down ${
            item === "profile" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">manage_accounts</span>
          <h4 className="mb-0">Profile</h4>
        </Link>
        <Link
          to={"/nutrition"}
          className={`d-flex  gap-1 align-items-center p-3 p-down ${
            item === "meal" ? "active" : ""
          }`}
        >
          <span className="material-symbols-outlined">dashboard_customize</span>
          <h4 className="mb-0">Meal Tracking</h4>
        </Link>

        <Link
          to={"/sleep"}
          className={`d-flex  gap-1 align-items-center p-3 p-down ${
            item === "sleep" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">bookmark</span>
          <h4 className="mb-0">Sleep Tracking</h4>
        </Link>
        <Link
          to={"/water"}
          className={`d-flex  gap-1 align-items-center p-3 p-down ${
            item === "water" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">monitor_heart</span>
          <h4 className="mb-0">Water Intake Tracking</h4>
        </Link>

        <Link
          to={"/weight"}
          className={`d-flex  gap-1 align-items-center p-3 p-down ${
            item === "weight" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">lock</span>
          <h4 className="mb-0">Weight Tracking</h4>
        </Link>
        <Link
          to={"/exercise"}
          className={`d-flex  gap-1 align-items-center p-3 p-down ${
            item === "exercise" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">lock</span>
          <h4 className="mb-0">Exercise Tracking</h4>
        </Link>
        <div className="d-flex  gap-1 align-items-center p-3 p-down" onClick={handleLogout}>
          <span class="material-symbols-outlined">logout</span>
          <h4 className="mb-0">Logout</h4>
        </div>
      </div>
    </>
  );
};

export default PatientSidebar;
