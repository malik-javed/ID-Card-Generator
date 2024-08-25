import React, { useState } from "react";
import { createIdCard, uploadImage } from "../api/api"; // Ensure this path is correct
import "./IDCardForm.css"; // Import component-specific styles

const IDCardForm = ({ onCardUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: {
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
    mobileNo: "",
    course: "",
    collegeName: "",
    rollNo: "",
    picture: "",
  });

  const handleFileChange = async (e) => {
    try {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      const file = e.target.files?.[0];

      if (!file || !allowedTypes.includes(file.type)) return;

      const formData = new FormData();
      formData.append("media", file);

      const res = await uploadImage(formData);

      setFormData((p) => ({ ...p, picture: res.url }));
    } catch (error) {
      console.log("errror: ", error);
    }
  };

  //1 - image uplado <- url
  // 2 - form sumit

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { idCard } = await createIdCard(formData);
      onCardUpdate(idCard);
    } catch (error) {
      console.error("Error creating ID card:", error);
    }
  };

  return (
    <div className="id-card-form form-container">
      <h2>Create ID Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address.city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address.state"
            placeholder="State"
            value={formData.address.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address.country"
            placeholder="Country"
            value={formData.address.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address.pinCode"
            placeholder="Pin Code"
            value={formData.address.pinCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNo">Roll Number</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="picture">Profile Picture</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IDCardForm;
