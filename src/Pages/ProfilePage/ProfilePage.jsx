import React, { useState } from "react";
import "./ProfilePage.css"; // Import your CSS file for styling
import PatientSidebar from "./../../Components/PatientSidebar/PatientSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../../Redux/Actions/UserActions";
import Sidebar from "../../Components/Sidebar/Sidebar";

const ProfilePage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  console.log(user);

  const [formData, setFormData] = useState({
    firstName: user?.user?.firstName || "",
    lastName: user?.user?.lastName || "",
    email: user?.user?.email || "",
    password: "",
    gender: user?.user?.gender || "",
    address: user?.user?.address || "",
    city: user?.user?.city || "",
    state: user?.user?.state | "",
    country: user?.user?.country || "",
  });

   React.useEffect(() => {
     // Fetch user data from the server when the component mounts
     setFormData({
       firstName: user?.user?.firstName || "",
       lastName: user?.user?.lastName || "",
       email: user?.user?.email || "",
       gender: user?.user?.gender || "",
       address: user?.user?.address || "",
       city: user?.user?.city || "",
       state: user?.user?.state || "",
       country: user?.user?.country || "",
     });
   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


  };
      const userUpdate = useSelector((state) => state.userUpdate);
      const { loading: updateLoading, userInfo } = userUpdate;
      console.log(userUpdate);
  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id: user._id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      })
    ); 
        dispatch(getUserDetails());
  };
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div className="wrapper">
      <Sidebar
        item="profile"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <div className="container">
        <div className="dashboard">
          <PatientSidebar item="profile" />
          <div className="main px-3">
            <div className="profile-page">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <h2>Profile</h2>
              <form
                className="form-container"
                onSubmit={(e) => handleUpdate(e)}
              >
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="gender">Gender:</label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="state">State:</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="country">Country:</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button>Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
