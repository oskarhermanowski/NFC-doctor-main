import writeTag from "./WriteTag/WriteTag";
import './WriteTagComponent.css';
import { useState } from "react";

export function WriteTagComponent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pesel: "",
    birthDate: "",
    bloodType: "",
    allergies: "",
    medications: "",
    chronicDiseases: "",
    assignedDoctorId: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWriteClick = () => {
    console.log("🧪 Clicked button with data:", formData);
    writeTag(formData);
  };

  return (
    <div className="row-btn-write">
      <div className="nfc-form">
        {Object.entries(formData).map(([key, value]) => (
          <div className="form-row" key={key}>
            <label htmlFor={key}>{key}:</label>
            <input
              type={key === "birthDate" ? "date" : "text"}
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <div className="btn-center">
        <button onClick={handleWriteClick} className="btn-write" id="btn-write">
          Write to NFC!!!
        </button>
      </div>

      <div className="log-write-div">
        <pre className="log-write-test" id="logWriteTagTest"></pre>
        <pre className="log-write" id="logWriteTag"></pre>
      </div>
    </div>
  );
}
