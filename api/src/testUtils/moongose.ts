import mongoose, { Types, ObjectId } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const mockUID = "62a23958e5a9e9b88f853a67";
export const getMockObjectId = () => {
  return new ObjectId("62a23958e5a9e9b88f853a67");
};
