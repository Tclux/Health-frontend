import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Booking.css";

const doctorDetails = {
  name: "John Doe",
  availableDays: [1, 3, 5], // Available on Monday, Wednesday, and Friday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  availableTimes: ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"], // Sample available times
};

const BookingPage = () => {

  // const api = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  // });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const { availableDays, availableTimes } = doctorDetails;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    // Check if the selected slot is available
    const isSlotAvailable = !bookedAppointments.some(
      (appointment) =>
        appointment.date.getTime() === selectedDate.getTime() &&
        appointment.time === selectedTime
    );

    if (isSlotAvailable) {
      const newBookedAppointments = [
        ...bookedAppointments,
        { date: selectedDate, time: selectedTime },
      ];
      setBookedAppointments(newBookedAppointments);
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      alert(
        `Appointment booked with Dr. ${doctorDetails.name} on ${formattedDate} at ${selectedTime}`
      );
    } else {
      alert("This slot is already booked. Please select another slot.");
    }
  };

  const isSlotAvailable = (date, time) => {
    return !bookedAppointments.some(
      (appointment) =>
        appointment.date.getTime() === date.getTime() &&
        appointment.time === time
    );
  };

  const isDateFullyBooked = (date) => {
    const availableSlots = availableTimes.filter((time) =>
      isSlotAvailable(date, time)
    );
    return availableSlots.length === 0;
  };

  return (
    <div className="py-3">
      <div className="booking-page container">
        <h1>Book an Appointment with Dr. {doctorDetails.name}</h1>
        <div className="calendar-container">
          <h2>Select a Date:</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileDisabled={({ date }) => !availableDays.includes(date.getDay())}
            tileClassName={({ date }) =>
              bookedAppointments.some(
                (appointment) => appointment.date.getTime() === date.getTime()
              )
                ? "booked-date"
                : ""
            }
            calendarClassName="custom-calendar"
            locale="en-US"
          />
        </div>
        <div className="time-slots">
          <h2>Select a Time:</h2>
          <select
            className="custom-select"
            onChange={(e) => handleTimeChange(e.target.value)}
            value={selectedTime}
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option
                key={time}
                value={time}
                disabled={!isSlotAvailable(selectedDate, time)}
              >
                {time}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleBooking} disabled={!selectedTime}>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
