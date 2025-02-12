import { Document, Schema, model } from "mongoose";
import { User } from "@/types/user";
import { UserRoles } from "../config/policy";
import { getEnumValues } from "@/utils/index";
export const userSchema = new Schema<User>(
  {
    firstName: { type: String, maxlength: 320 },
    lastName: { type: String, maxlength: 320 },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    hashedPassword: { type: String, maxlength: 320 },
    salt: { type: String, maxlength: 320 },
    verified: {
      type: Boolean,
      default: false,
    },
    organization: { type: String, maxlength: 320 },
    role: { type: String, enum: getEnumValues(UserRoles) },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

export default model<User>("User", userSchema);
