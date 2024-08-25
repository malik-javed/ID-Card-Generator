import mongoose from "mongoose";

const idCardSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      minlength: [2, "Full Name must be at least 2 characters long"],
      maxlength: [100, "Full Name must be less than 100 characters"],
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"],
      validate: {
        validator: function (v) {
          return v <= new Date(); // DOB should not be in the future
        },
        message: "Date of Birth cannot be in the future",
      },
    },
    address: {
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
      pinCode: {
        type: String,
        required: [true, "Pin Code is required"],
        match: [/^\d{5,6}$/, "Pin Code should be 5 or 6 digits long"], // Adjust regex based on country
      },
    },
    mobileNo: {
      type: String,
      required: [true, "Mobile Number is required"],
      match: [/^\d{10}$/, "Mobile Number should be exactly 10 digits long"], // Example for 10-digit phone number
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      minlength: [2, "Course must be at least 2 characters long"],
      maxlength: [100, "Course must be less than 100 characters"],
    },
    collegeName: {
      type: String,
      required: [true, "College Name is required"],
      minlength: [2, "College Name must be at least 2 characters long"],
      maxlength: [200, "College Name must be less than 200 characters"],
    },
    rollNo: {
      type: String,
      required: [true, "Roll Number is required"],
      minlength: [2, "Roll Number must be at least 2 characters long"],
      maxlength: [20, "Roll Number must be less than 20 characters"],
    },
    picture: {
      type: String,
      required: [true, "Picture is required"],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Create a composite unique index on rollNo and collegeName
idCardSchema.index({ rollNo: 1, collegeName: 1 }, { unique: true });

const IDCard = mongoose.model("IDCard", idCardSchema);

export { IDCard };
