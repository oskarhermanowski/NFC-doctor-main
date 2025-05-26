import writeTag from "./WriteTag/WriteTag";
import './WriteTagComponent.css';
import { disableButtons } from "../ButtonActions/DisableButtons";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await writeTag(formData);     // ✅ CZEKAJ na zapis
      disableButtons();             // ✅ Wyłącz przyciski dopiero po sukcesie
    } catch (error) {
      console.error("❌ Write to NFC failed:", error);
      // Możesz też pokazać komunikat błędu użytkownikowi
    }
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
