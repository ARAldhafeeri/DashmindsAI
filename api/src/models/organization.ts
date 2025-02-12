import { Document, Schema, model } from "mongoose";
import { Organization } from "@/types/organization";

export const organizationSchema = new Schema<Organization>(
  {
    name: { type: String, maxlength: 320 },
  },

  { timestamps: true }
);

export default model("Organization", organizationSchema);
