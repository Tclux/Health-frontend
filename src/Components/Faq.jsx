import React, { useState } from "react";
// import "./FAQ.css"; // Import your CSS file for styling

const FAQ = () => {
  const AccordionData = [
    {
      id: "collapseOne",
      title: "Emergency medicine",
      content:
        "Daycare management software is a specialized tool designed to streamline and automate various administrative tasks within a daycare center. It assists in managing enrollments, schedules, staff, billing, parent communication, and more.",
    },
    {
      id: "collapseTwo",
      title: "Obstetrics and gynecology",
      content:
        "Key features include attendance tracking, child profiles, staff management, billing and invoicing, scheduling, parent communication, immunization records, reporting, and often include additional features like meal planning, learning activities, and security features.",
    },
    {
      id: "Dermatology",
      title: "Dermatology",
      content:
        "It helps improve operational efficiency by automating manual tasks, enhances communication between staff and parents, ensures accurate record-keeping, simplifies billing and payments, and provides insights for better decision-making.",
    },
    {
      id: "Surgery",
      title: "Family medicine",
      content:
        "Reputable daycare management software providers prioritize data security. They often employ encryption methods, regular backups, secure logins, and adhere to compliance standards like HIPAA and GDPR to ensure data protection.",
    },
    {
      id: "collapseFive",
      title: "Surgery",
      content:
        "Yes, it facilitates transparent communication between daycare centers and parents. Features like real-time updates on children's activities, messaging, event calendars, and photo sharing help in fostering strong parent engagement.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="accordion-container w-100 mt-4 mt-lg-0">
      <h4>Offered Services</h4>
      {AccordionData.map((item, index) => (
        <div
          key={item.id}
          onClick={() => handleAccordionClick(index)}
          className={`accordion-item ${openIndex === index ? "open" : ""}`}
        >
          <div className="accordion-header">
            <div className="accordion-title">
              {item.title}
              <p className="mb-0">4 services</p>
            </div>
            <div className="accordion-arrow">
              <span class="material-symbols-outlined mb-0">expand_more</span>
            </div>
          </div>
          <div className="accordion-content">
            <div className="d-flex justify-content-between">
              <h5>Anatomical pathology</h5>
              <p>$300</p>
            </div>
            <div className="d-flex justify-content-between">
              <h5>Anatomical pathology</h5>
              <p>$300</p>
            </div>
            <div className="d-flex justify-content-between">
              <h5>Anatomical pathology</h5>
              <p>$300</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
