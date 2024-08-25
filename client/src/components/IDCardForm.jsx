import React, { useState } from "react";
import { createIdCard, uploadImage } from "../api/api";
import { z } from "zod";
import "./IDCardForm.css";

const idCardSchema = z.object({
  fullName: z
    .string({
      required_error: "Full Name is required",
    })
    .min(2, "Full Name must be at least 2 characters long")
    .max(100, "Full Name must be less than 100 characters"),
  dob: z.coerce
    .date({
      required_error: "Date of Birth is required",
    })
    .refine((date) => date <= new Date(), {
      message: "Date of Birth cannot be in the future",
    }),
  address: z.object({
    city: z
      .string({
        required_error: "City is required",
      })
      .min(1, "City is required"),
    state: z
      .string({
        required_error: "State is required",
      })
      .min(1, "State is required"),
    country: z
      .string({
        required_error: "Country is required",
      })
      .min(1, "Country is required"),
    pinCode: z
      .string({
        required_error: "Pin Code is required",
      })
      .regex(/^\d{5,6}$/, "Pin Code should be 5 or 6 digits long"),
  }),
  mobileNo: z
    .string({
      required_error: "Mobile Number is required",
    })
    .regex(/^\d{10}$/, "Mobile Number should be exactly 10 digits long"),
  course: z
    .string({
      required_error: "Course is required",
    })
    .min(2, "Course must be at least 2 characters long")
    .max(100, "Course must be less than 100 characters"),
  collegeName: z
    .string({
      required_error: "College Name is required",
    })
    .min(2, "College Name must be at least 2 characters long")
    .max(200, "College Name must be less than 200 characters"),
  rollNo: z
    .string({
      required_error: "Roll Number is required",
    })
    .min(2, "Roll Number must be at least 2 characters long")
    .max(20, "Roll Number must be less than 20 characters"),
  picture: z
    .string({
      required_error: "Picture is required",
    })
    .url(),
});

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

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = idCardSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = {};
      validation.error.errors.forEach((error) => {
        fieldErrors[error.path.join(".")] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const { idCard } = await createIdCard(formData);
      onCardUpdate(idCard);
      setErrors({});
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
          {errors.fullName && (
            <div className="error-message">{errors.fullName}</div>
          )}
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
          {errors.dob && <div className="error-message">{errors.dob}</div>}
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
          {errors["address.city"] && (
            <div className="error-message">{errors["address.city"]}</div>
          )}
          <input
            type="text"
            name="address.state"
            placeholder="State"
            value={formData.address.state}
            onChange={handleChange}
            required
          />
          {errors["address.state"] && (
            <div className="error-message">{errors["address.state"]}</div>
          )}
          <input
            type="text"
            name="address.country"
            placeholder="Country"
            value={formData.address.country}
            onChange={handleChange}
            required
          />
          {errors["address.country"] && (
            <div className="error-message">{errors["address.country"]}</div>
          )}
          <input
            type="text"
            name="address.pinCode"
            placeholder="Pin Code"
            value={formData.address.pinCode}
            onChange={handleChange}
            required
          />
          {errors["address.pinCode"] && (
            <div className="error-message">{errors["address.pinCode"]}</div>
          )}
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
          {errors.mobileNo && (
            <div className="error-message">{errors.mobileNo}</div>
          )}
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
          {errors.course && (
            <div className="error-message">{errors.course}</div>
          )}
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
          {errors.collegeName && (
            <div className="error-message">{errors.collegeName}</div>
          )}
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
          {errors.rollNo && (
            <div className="error-message">{errors.rollNo}</div>
          )}
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
          {errors.picture && (
            <div className="error-message">{errors.picture}</div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IDCardForm;
