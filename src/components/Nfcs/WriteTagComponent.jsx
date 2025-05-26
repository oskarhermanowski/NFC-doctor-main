import writeTag from "./WriteTag/WriteTag";
import './WriteTagComponent.css';
import { disableButtons } from "../ButtonActions/DisableButtons";
import { useState } from "react";

export function WriteTagComponent({ QrScanResult }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    writeTag(formData);
    disableButtons();
  };

  return (
    <div className="row-btn-write">
      <form onSubmit={handleSubmit} className="nfc-form">
        {Object.entries(formData).map(([key, value]) => (
          <div className="form-row" key={key}>
            <label htmlFor={key}>{key}:</label>
            <input
              type={key === "birthDate" ? "date" : "text"}
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="btn-center">
          <button type="submit" className="btn-write" id="btn-write">
            Write to NFC
          </button>
        </div>
      </form>
      <div className="log-write-div">
        <pre className="log-write-test" id="logWriteTagTest"></pre>
        <pre className="log-write" id="logWriteTag"></pre>
      </div>
    </div>
  );
}
