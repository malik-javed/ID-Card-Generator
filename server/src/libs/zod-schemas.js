import { z } from "zod";

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

  address: z.object(
    {
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
    },
    {
      required_error: "Address Object is required",
    }
  ),

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

// Example usage for validating an input
// const validationResult = idCardSchema.safeParse(inputData);

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const ObjectIdFormatSchema = z
  .string()
  .refine((value) => objectIdRegex.test(value), {
    message: "Invalid ObjectID format",
  });

export const ObjectIdParamSchema = (paramName) =>
  z.object({
    [paramName]: ObjectIdFormatSchema,
  });

export { idCardSchema };
